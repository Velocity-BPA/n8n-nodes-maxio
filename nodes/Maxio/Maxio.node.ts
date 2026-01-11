/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	maxioApiRequest,
	maxioApiRequestAllItems,
	convertKeysToSnakeCase,
} from './GenericFunctions';

import {
	subscriptionOperations,
	subscriptionFields,
	customerOperations,
	customerFields,
	productOperations,
	productFields,
	componentOperations,
	componentFields,
	invoiceOperations,
	invoiceFields,
	paymentProfileOperations,
	paymentProfileFields,
	couponOperations,
	couponFields,
	productFamilyOperations,
	productFamilyFields,
	statementOperations,
	statementFields,
	transactionOperations,
	transactionFields,
	webhookOperations,
	webhookFields,
	siteOperations,
	siteFields,
} from './descriptions';

export class Maxio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Maxio',
		name: 'maxio',
		icon: 'file:maxio.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Maxio (Chargify) subscription billing API',
		defaults: {
			name: 'Maxio',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'maxioApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Component', value: 'component' },
					{ name: 'Coupon', value: 'coupon' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Payment Profile', value: 'paymentProfile' },
					{ name: 'Product', value: 'product' },
					{ name: 'Product Family', value: 'productFamily' },
					{ name: 'Site', value: 'site' },
					{ name: 'Statement', value: 'statement' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'Webhook', value: 'webhook' },
				],
				default: 'subscription',
			},
			// Operations
			...subscriptionOperations,
			...customerOperations,
			...productOperations,
			...componentOperations,
			...invoiceOperations,
			...paymentProfileOperations,
			...couponOperations,
			...productFamilyOperations,
			...statementOperations,
			...transactionOperations,
			...webhookOperations,
			...siteOperations,
			// Fields
			...subscriptionFields,
			...customerFields,
			...productFields,
			...componentFields,
			...invoiceFields,
			...paymentProfileFields,
			...couponFields,
			...productFamilyFields,
			...statementFields,
			...transactionFields,
			...webhookFields,
			...siteFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// ========================================
				//            SUBSCRIPTION
				// ========================================
				if (resource === 'subscription') {
					if (operation === 'get') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}.json`);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.state) qs['filter[states]'] = filters.state;
						if (filters.product) qs['filter[product]'] = filters.product;
						if (filters.productPricePointId) qs['filter[product_price_point_id]'] = filters.productPricePointId;
						if (filters.coupon) qs['filter[coupon]'] = filters.coupon;
						if (filters.dateField) qs.date_field = filters.dateField;
						if (filters.startDate) qs.start_date = filters.startDate;
						if (filters.endDate) qs.end_date = filters.endDate;
						if (filters.startDatetime) qs.start_datetime = filters.startDatetime;
						if (filters.endDatetime) qs.end_datetime = filters.endDatetime;
						if (filters.metadata) qs['filter[metadata]'] = filters.metadata;
						if (filters.direction) qs.direction = filters.direction;
						if (filters.sort) qs.sort = filters.sort;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/subscriptions.json', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/subscriptions.json', {}, qs);
							responseData = (response as IDataObject[]).map((s: IDataObject) => (s as IDataObject).subscription as IDataObject);
						}
					}

					if (operation === 'create') {
						const productId = this.getNodeParameter('productId', i) as number;
						const customerId = this.getNodeParameter('customerId', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							subscription: {
								product_id: productId,
								customer_id: customerId,
								...convertKeysToSnakeCase(additionalFields),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/subscriptions.json', body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'update') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							subscription: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/subscriptions/${subscriptionId}.json`, body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'cancel') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const cancelOptions = this.getNodeParameter('cancelOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							subscription: convertKeysToSnakeCase(cancelOptions),
						};

						responseData = await maxioApiRequest.call(this, 'DELETE', `/subscriptions/${subscriptionId}.json`, body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'reactivate') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const reactivateOptions = this.getNodeParameter('reactivateOptions', i, {}) as IDataObject;

						const body: IDataObject = convertKeysToSnakeCase(reactivateOptions);

						responseData = await maxioApiRequest.call(this, 'PUT', `/subscriptions/${subscriptionId}/reactivate.json`, body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'resetBalance') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/reset_balance.json`);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'updateProduct') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const productId = this.getNodeParameter('newProductId', i) as number;
						const migrationOptions = this.getNodeParameter('migrationOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							migration: {
								product_id: productId,
								...convertKeysToSnakeCase(migrationOptions),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/migrations.json`, body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'updatePaymentProfile') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const paymentProfileId = this.getNodeParameter('paymentProfileId', i) as number;

						const body: IDataObject = {
							subscription: {
								payment_profile_id: paymentProfileId,
							},
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/subscriptions/${subscriptionId}.json`, body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'previewRenewal') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/renewals/preview.json`);
					}

					if (operation === 'previewMigration') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const productId = this.getNodeParameter('previewProductId', i) as number;

						const body: IDataObject = {
							migration: {
								product_id: productId,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/migrations/preview.json`, body);
					}

					if (operation === 'addCoupon') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const couponCode = this.getNodeParameter('couponCode', i) as string;
						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/add_coupon.json?code=${couponCode}`);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}

					if (operation === 'removeCoupon') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const couponCode = this.getNodeParameter('removeCouponCode', i) as string;
						responseData = await maxioApiRequest.call(this, 'DELETE', `/subscriptions/${subscriptionId}/remove_coupon.json?code=${couponCode}`);
					}

					if (operation === 'getPrepayments') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/subscriptions/${subscriptionId}/prepayments.json`, {}, {}, 'prepayments');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/prepayments.json`, {}, { per_page: limit });
							responseData = (response as IDataObject).prepayments as IDataObject[];
						}
					}

					if (operation === 'createPrepayment') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const amountInCents = this.getNodeParameter('prepaymentAmount', i) as number;
						const memo = this.getNodeParameter('prepaymentMemo', i) as string;
						const method = this.getNodeParameter('prepaymentMethod', i) as string;

						const body: IDataObject = {
							prepayment: {
								amount_in_cents: amountInCents,
								memo,
								method,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/prepayments.json`, body);
						responseData = (responseData as IDataObject).prepayment as IDataObject;
					}

					if (operation === 'refundPrepayment') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const prepaymentId = this.getNodeParameter('prepaymentId', i) as number;
						const amountInCents = this.getNodeParameter('refundAmount', i) as number;

						const body: IDataObject = {
							refund: {
								amount_in_cents: amountInCents,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/prepayments/${prepaymentId}/refunds.json`, body);
						responseData = (responseData as IDataObject).prepayment_refund as IDataObject;
					}

					if (operation === 'getEvents') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('eventsFilters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.sinceId) qs.since_id = filters.sinceId;
						if (filters.maxId) qs.max_id = filters.maxId;
						if (filters.direction) qs.direction = filters.direction;
						if (filters.filterEventKey) qs['filter[event_key]'] = filters.filterEventKey;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/subscriptions/${subscriptionId}/events.json`, {}, qs, 'events');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/events.json`, {}, qs);
							responseData = (response as IDataObject[]).map((e: IDataObject) => (e as IDataObject).event as IDataObject);
						}
					}

					if (operation === 'getMetadata') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/metadata.json`);
						responseData = (responseData as IDataObject).metadata as IDataObject[];
					}

					if (operation === 'setMetadata') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const metadataItems = this.getNodeParameter('metadataItems', i) as { metadata: IDataObject[] };

						const body: IDataObject = {
							metadata: metadataItems.metadata.map((m: IDataObject) => ({
								name: m.name,
								value: m.value,
							})),
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/metadata.json`, body);
						responseData = (responseData as IDataObject).metadata as IDataObject[];
					}

					if (operation === 'override') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const overrideFields = this.getNodeParameter('overrideFields', i, {}) as IDataObject;

						const body: IDataObject = {
							subscription: convertKeysToSnakeCase(overrideFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/subscriptions/${subscriptionId}/override.json`, body);
						responseData = (responseData as IDataObject).subscription as IDataObject;
					}
				}

				// ========================================
				//            CUSTOMER
				// ========================================
				if (resource === 'customer') {
					if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/customers/${customerId}.json`);
						responseData = (responseData as IDataObject).customer as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.state) qs['filter[state]'] = filters.state;
						if (filters.dateField) qs.date_field = filters.dateField;
						if (filters.startDate) qs.start_date = filters.startDate;
						if (filters.endDate) qs.end_date = filters.endDate;
						if (filters.startDatetime) qs.start_datetime = filters.startDatetime;
						if (filters.endDatetime) qs.end_datetime = filters.endDatetime;
						if (filters.email) qs.q = filters.email;
						if (filters.direction) qs.direction = filters.direction;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/customers.json', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/customers.json', {}, qs);
							responseData = (response as IDataObject[]).map((c: IDataObject) => (c as IDataObject).customer as IDataObject);
						}
					}

					if (operation === 'create') {
						const firstName = this.getNodeParameter('firstName', i) as string;
						const lastName = this.getNodeParameter('lastName', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							customer: {
								first_name: firstName,
								last_name: lastName,
								email,
								...convertKeysToSnakeCase(additionalFields),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/customers.json', body);
						responseData = (responseData as IDataObject).customer as IDataObject;
					}

					if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							customer: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/customers/${customerId}.json`, body);
						responseData = (responseData as IDataObject).customer as IDataObject;
					}

					if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						await maxioApiRequest.call(this, 'DELETE', `/customers/${customerId}.json`);
						responseData = { success: true };
					}

					if (operation === 'getSubscriptions') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/customers/${customerId}/subscriptions.json`, {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/customers/${customerId}/subscriptions.json`, {}, { per_page: limit });
							responseData = (response as IDataObject[]).map((s: IDataObject) => (s as IDataObject).subscription as IDataObject);
						}
					}

					if (operation === 'getPaymentProfiles') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						const response = await maxioApiRequest.call(this, 'GET', `/customers/${customerId}/payment_profiles.json`);
						responseData = (response as IDataObject[]).map((p: IDataObject) => (p as IDataObject).payment_profile as IDataObject);
					}

					if (operation === 'getMetadata') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/customers/${customerId}/metadata.json`);
						responseData = (responseData as IDataObject).metadata as IDataObject[];
					}

					if (operation === 'setMetadata') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						const metadataItems = this.getNodeParameter('metadataItems', i) as { metadata: IDataObject[] };

						const body: IDataObject = {
							metadata: metadataItems.metadata.map((m: IDataObject) => ({
								name: m.name,
								value: m.value,
							})),
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/customers/${customerId}/metadata.json`, body);
						responseData = (responseData as IDataObject).metadata as IDataObject[];
					}
				}

				// ========================================
				//            PRODUCT
				// ========================================
				if (resource === 'product') {
					if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/products/${productId}.json`);
						responseData = (responseData as IDataObject).product as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.includeArchived) qs.include_archived = filters.includeArchived;
						if (filters.dateField) qs.date_field = filters.dateField;
						if (filters.startDate) qs.start_date = filters.startDate;
						if (filters.endDate) qs.end_date = filters.endDate;
						if (filters.startDatetime) qs.start_datetime = filters.startDatetime;
						if (filters.endDatetime) qs.end_datetime = filters.endDatetime;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/products.json', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/products.json', {}, qs);
							responseData = (response as IDataObject[]).map((p: IDataObject) => (p as IDataObject).product as IDataObject);
						}
					}

					if (operation === 'create') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const priceInCents = this.getNodeParameter('priceInCents', i) as number;
						const interval = this.getNodeParameter('interval', i) as number;
						const intervalUnit = this.getNodeParameter('intervalUnit', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							product: {
								name,
								price_in_cents: priceInCents,
								interval,
								interval_unit: intervalUnit,
								...convertKeysToSnakeCase(additionalFields),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/product_families/${productFamilyId}/products.json`, body);
						responseData = (responseData as IDataObject).product as IDataObject;
					}

					if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							product: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/products/${productId}.json`, body);
						responseData = (responseData as IDataObject).product as IDataObject;
					}

					if (operation === 'archive') {
						const productId = this.getNodeParameter('productId', i) as number;
						responseData = await maxioApiRequest.call(this, 'DELETE', `/products/${productId}.json`);
						responseData = (responseData as IDataObject).product as IDataObject;
					}

					if (operation === 'getComponents') {
						const productId = this.getNodeParameter('productId', i) as number;
						const response = await maxioApiRequest.call(this, 'GET', `/products/${productId}/price_points.json`);
						responseData = response as IDataObject[];
					}
				}

				// ========================================
				//            COMPONENT
				// ========================================
				if (resource === 'component') {
					if (operation === 'get') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const componentId = this.getNodeParameter('componentId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/components/${componentId}.json`);
						responseData = (responseData as IDataObject).component as IDataObject;
					}

					if (operation === 'getAll') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.includeArchived) qs.include_archived = filters.includeArchived;
						if (filters.filterIds) qs['filter[ids]'] = filters.filterIds;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/components.json`, {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/components.json`, {}, qs);
							responseData = (response as IDataObject[]).map((c: IDataObject) => (c as IDataObject).component as IDataObject);
						}
					}

					if (operation === 'create') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const componentKind = this.getNodeParameter('componentKind', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const unitName = this.getNodeParameter('unitName', i) as string;
						const pricingScheme = this.getNodeParameter('pricingScheme', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const componentData: IDataObject = {
							name,
							unit_name: unitName,
							pricing_scheme: pricingScheme,
							...convertKeysToSnakeCase(additionalFields),
						};

						const body: IDataObject = {
							[componentKind]: componentData,
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/product_families/${productFamilyId}/components/${componentKind}.json`, body);
						responseData = (responseData as IDataObject).component as IDataObject;
					}

					if (operation === 'update') {
						const componentId = this.getNodeParameter('componentId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							component: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/components/${componentId}.json`, body);
						responseData = (responseData as IDataObject).component as IDataObject;
					}

					if (operation === 'archive') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const componentId = this.getNodeParameter('componentId', i) as number;
						responseData = await maxioApiRequest.call(this, 'DELETE', `/product_families/${productFamilyId}/components/${componentId}.json`);
						responseData = (responseData as IDataObject).component as IDataObject;
					}

					if (operation === 'getAllocations') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const componentId = this.getNodeParameter('componentId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/subscriptions/${subscriptionId}/components/${componentId}/allocations.json`, {}, {}, 'allocations');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/components/${componentId}/allocations.json`, {}, { per_page: limit });
							responseData = (response as IDataObject).allocations as IDataObject[];
						}
					}

					if (operation === 'createAllocation') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const componentId = this.getNodeParameter('componentId', i) as number;
						const quantity = this.getNodeParameter('quantity', i) as number;
						const allocationOptions = this.getNodeParameter('allocationOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							allocation: {
								quantity,
								...convertKeysToSnakeCase(allocationOptions),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/components/${componentId}/allocations.json`, body);
						responseData = (responseData as IDataObject).allocation as IDataObject;
					}

					if (operation === 'getAllPricePoints') {
						const componentId = this.getNodeParameter('componentId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/components/${componentId}/price_points.json`, {}, {}, 'price_points');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/components/${componentId}/price_points.json`, {}, { per_page: limit });
							responseData = (response as IDataObject).price_points as IDataObject[];
						}
					}

					if (operation === 'createPricePoint') {
						const componentId = this.getNodeParameter('componentId', i) as number;
						const name = this.getNodeParameter('pricePointName', i) as string;
						const pricingScheme = this.getNodeParameter('pricePointPricingScheme', i) as string;
						const prices = this.getNodeParameter('prices', i) as { priceItems: IDataObject[] };

						const body: IDataObject = {
							price_point: {
								name,
								pricing_scheme: pricingScheme,
								prices: prices.priceItems.map((p: IDataObject) => ({
									starting_quantity: p.startingQuantity,
									ending_quantity: p.endingQuantity,
									unit_price: p.unitPrice,
								})),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/components/${componentId}/price_points.json`, body);
						responseData = (responseData as IDataObject).price_point as IDataObject;
					}

					if (operation === 'updatePricePoint') {
						const componentId = this.getNodeParameter('componentId', i) as number;
						const pricePointId = this.getNodeParameter('pricePointId', i) as number;
						const updateFields = this.getNodeParameter('pricePointUpdateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							price_point: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/components/${componentId}/price_points/${pricePointId}.json`, body);
						responseData = (responseData as IDataObject).price_point as IDataObject;
					}

					if (operation === 'archivePricePoint') {
						const componentId = this.getNodeParameter('componentId', i) as number;
						const pricePointId = this.getNodeParameter('pricePointId', i) as number;
						responseData = await maxioApiRequest.call(this, 'DELETE', `/components/${componentId}/price_points/${pricePointId}.json`);
						responseData = (responseData as IDataObject).price_point as IDataObject;
					}

					if (operation === 'listUsages') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const componentId = this.getNodeParameter('componentId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/subscriptions/${subscriptionId}/components/${componentId}/usages.json`, {}, {}, 'usages');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/components/${componentId}/usages.json`, {}, { per_page: limit });
							responseData = (response as IDataObject[]).map((u: IDataObject) => (u as IDataObject).usage as IDataObject);
						}
					}

					if (operation === 'createUsage') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const componentId = this.getNodeParameter('componentId', i) as number;
						const quantity = this.getNodeParameter('usageQuantity', i) as number;
						const usageOptions = this.getNodeParameter('usageOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							usage: {
								quantity,
								...convertKeysToSnakeCase(usageOptions),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/components/${componentId}/usages.json`, body);
						responseData = (responseData as IDataObject).usage as IDataObject;
					}
				}

				// ========================================
				//            INVOICE
				// ========================================
				if (resource === 'invoice') {
					if (operation === 'get') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						responseData = await maxioApiRequest.call(this, 'GET', `/invoices/${invoiceUid}.json`);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.status) qs.status = filters.status;
						if (filters.subscriptionId) qs.subscription_id = filters.subscriptionId;
						if (filters.customerId) qs.customer_id = filters.customerId;
						if (filters.startDate) qs.start_date = filters.startDate;
						if (filters.endDate) qs.end_date = filters.endDate;
						if (filters.dateField) qs.date_field = filters.dateField;
						if (filters.direction) qs.direction = filters.direction;
						if (filters.lineItems) qs.line_items = filters.lineItems;
						if (filters.discounts) qs.discounts = filters.discounts;
						if (filters.taxes) qs.taxes = filters.taxes;
						if (filters.credits) qs.credits = filters.credits;
						if (filters.payments) qs.payments = filters.payments;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/invoices.json', {}, qs, 'invoices');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/invoices.json', {}, qs);
							responseData = (response as IDataObject).invoices as IDataObject[];
						}
					}

					if (operation === 'create') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const lineItems = this.getNodeParameter('lineItems', i) as { items: IDataObject[] };

						const body: IDataObject = {
							invoice: {
								line_items: lineItems.items.map((item: IDataObject) => ({
									title: item.title,
									quantity: item.quantity,
									unit_price: item.unitPrice,
									description: item.description,
								})),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/invoices.json`, body);
					}

					if (operation === 'void') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const voidReason = this.getNodeParameter('voidReason', i) as string;

						const body: IDataObject = {
							void: {
								reason: voidReason,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/invoices/${invoiceUid}/void.json`, body);
					}

					if (operation === 'refund') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const refundAmount = this.getNodeParameter('refundAmount', i) as string;
						const refundMemo = this.getNodeParameter('refundMemo', i) as string;

						const body: IDataObject = {
							refund: {
								amount: refundAmount,
								memo: refundMemo,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/invoices/${invoiceUid}/refunds.json`, body);
					}

					if (operation === 'issueAdvanceInvoice') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'POST', `/subscriptions/${subscriptionId}/advance_invoice/issue.json`);
					}

					if (operation === 'recordPayment') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const paymentAmount = this.getNodeParameter('paymentAmount', i) as string;
						const paymentMethod = this.getNodeParameter('paymentMethod', i) as string;
						const paymentMemo = this.getNodeParameter('paymentMemo', i, '') as string;

						const body: IDataObject = {
							payment: {
								amount: paymentAmount,
								method: paymentMethod,
								memo: paymentMemo,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/invoices/${invoiceUid}/payments.json`, body);
					}

					if (operation === 'applyPayment') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const paymentId = this.getNodeParameter('paymentId', i) as number;
						const applyAmount = this.getNodeParameter('applyAmount', i) as string;

						const body: IDataObject = {
							payment: {
								prepayment_id: paymentId,
								amount: applyAmount,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/invoices/${invoiceUid}/apply_prepayment.json`, body);
					}

					if (operation === 'applyCredit') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const creditAmount = this.getNodeParameter('creditAmount', i) as string;
						const creditMemo = this.getNodeParameter('creditMemo', i, '') as string;

						const body: IDataObject = {
							credit_note: {
								amount: creditAmount,
								memo: creditMemo,
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/invoices/${invoiceUid}/credits.json`, body);
					}

					if (operation === 'sendEmail') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const emailRecipients = this.getNodeParameter('emailRecipients', i, '') as string;

						const body: IDataObject = {};
						if (emailRecipients) {
							body.recipient_emails = emailRecipients.split(',').map((e: string) => e.trim());
						}

						responseData = await maxioApiRequest.call(this, 'POST', `/invoices/${invoiceUid}/deliveries.json`, body);
					}

					if (operation === 'getEvents') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/invoices/${invoiceUid}/events.json`, {}, {}, 'events');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/invoices/${invoiceUid}/events.json`, {}, { per_page: limit });
							responseData = (response as IDataObject).events as IDataObject[];
						}
					}

					if (operation === 'getLineItems') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const response = await maxioApiRequest.call(this, 'GET', `/invoices/${invoiceUid}.json`);
						responseData = (response as IDataObject).line_items as IDataObject[];
					}

					if (operation === 'getCreditNotes') {
						const invoiceUid = this.getNodeParameter('invoiceUid', i) as string;
						const response = await maxioApiRequest.call(this, 'GET', `/invoices/${invoiceUid}/credit_notes.json`);
						responseData = (response as IDataObject).credit_notes as IDataObject[];
					}
				}

				// ========================================
				//            PAYMENT PROFILE
				// ========================================
				if (resource === 'paymentProfile') {
					if (operation === 'get') {
						const paymentProfileId = this.getNodeParameter('paymentProfileId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/payment_profiles/${paymentProfileId}.json`);
						responseData = (responseData as IDataObject).payment_profile as IDataObject;
					}

					if (operation === 'getAll') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/customers/${customerId}/payment_profiles.json`, {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/customers/${customerId}/payment_profiles.json`, {}, { per_page: limit });
							responseData = (response as IDataObject[]).map((p: IDataObject) => (p as IDataObject).payment_profile as IDataObject);
						}
					}

					if (operation === 'create') {
						const customerId = this.getNodeParameter('customerId', i) as number;
						const paymentType = this.getNodeParameter('paymentType', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const paymentProfileData: IDataObject = {
							customer_id: customerId,
							...convertKeysToSnakeCase(additionalFields),
						};

						if (paymentType === 'credit_card') {
							paymentProfileData.full_number = this.getNodeParameter('fullNumber', i) as string;
							paymentProfileData.expiration_month = this.getNodeParameter('expirationMonth', i) as number;
							paymentProfileData.expiration_year = this.getNodeParameter('expirationYear', i) as number;
							paymentProfileData.cvv = this.getNodeParameter('cvv', i) as string;
						} else if (paymentType === 'bank_account') {
							paymentProfileData.bank_name = this.getNodeParameter('bankName', i) as string;
							paymentProfileData.bank_routing_number = this.getNodeParameter('bankRoutingNumber', i) as string;
							paymentProfileData.bank_account_number = this.getNodeParameter('bankAccountNumber', i) as string;
							paymentProfileData.bank_account_type = this.getNodeParameter('bankAccountType', i) as string;
							paymentProfileData.bank_account_holder_type = this.getNodeParameter('bankAccountHolderType', i) as string;
						}

						const body: IDataObject = {
							payment_profile: paymentProfileData,
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/payment_profiles.json', body);
						responseData = (responseData as IDataObject).payment_profile as IDataObject;
					}

					if (operation === 'update') {
						const paymentProfileId = this.getNodeParameter('paymentProfileId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							payment_profile: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/payment_profiles/${paymentProfileId}.json`, body);
						responseData = (responseData as IDataObject).payment_profile as IDataObject;
					}

					if (operation === 'delete') {
						const paymentProfileId = this.getNodeParameter('paymentProfileId', i) as number;
						await maxioApiRequest.call(this, 'DELETE', `/payment_profiles/${paymentProfileId}.json`);
						responseData = { success: true };
					}

					if (operation === 'setDefault') {
						const paymentProfileId = this.getNodeParameter('paymentProfileId', i) as number;
						responseData = await maxioApiRequest.call(this, 'PUT', `/payment_profiles/${paymentProfileId}/make_default.json`);
						responseData = (responseData as IDataObject).payment_profile as IDataObject;
					}
				}

				// ========================================
				//            COUPON
				// ========================================
				if (resource === 'coupon') {
					if (operation === 'get') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/coupons/${couponId}.json`);
						responseData = (responseData as IDataObject).coupon as IDataObject;
					}

					if (operation === 'getAll') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.currencyPrices) qs.currency_prices = filters.currencyPrices;
						if (filters.filterEndDate) qs['filter[end_date]'] = filters.filterEndDate;
						if (filters.filterEndDatetimeEnd) qs['filter[end_datetime][end]'] = filters.filterEndDatetimeEnd;
						if (filters.filterEndDatetimeStart) qs['filter[end_datetime][start]'] = filters.filterEndDatetimeStart;
						if (filters.filterIds) qs['filter[ids]'] = filters.filterIds;
						if (filters.filterCodes) qs['filter[codes]'] = filters.filterCodes;
						if (filters.filterUseSiteExchangeRate) qs['filter[use_site_exchange_rate]'] = filters.filterUseSiteExchangeRate;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/coupons.json`, {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/coupons.json`, {}, qs);
							responseData = (response as IDataObject[]).map((c: IDataObject) => (c as IDataObject).coupon as IDataObject);
						}
					}

					if (operation === 'create') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const code = this.getNodeParameter('code', i) as string;
						const discountType = this.getNodeParameter('discountType', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const couponData: IDataObject = {
							name,
							code,
							...convertKeysToSnakeCase(additionalFields),
						};

						if (discountType === 'percent') {
							couponData.percentage = this.getNodeParameter('percentage', i) as number;
						} else {
							couponData.amount_in_cents = this.getNodeParameter('amountInCents', i) as number;
						}

						const body: IDataObject = {
							coupon: couponData,
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/product_families/${productFamilyId}/coupons.json`, body);
						responseData = (responseData as IDataObject).coupon as IDataObject;
					}

					if (operation === 'update') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							coupon: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/product_families/${productFamilyId}/coupons/${couponId}.json`, body);
						responseData = (responseData as IDataObject).coupon as IDataObject;
					}

					if (operation === 'archive') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						responseData = await maxioApiRequest.call(this, 'DELETE', `/product_families/${productFamilyId}/coupons/${couponId}.json`);
						responseData = (responseData as IDataObject).coupon as IDataObject;
					}

					if (operation === 'getSubcodes') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/coupons/${couponId}/codes.json`, {}, {}, 'codes');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/coupons/${couponId}/codes.json`, {}, { per_page: limit });
							responseData = (response as IDataObject).codes as IDataObject[];
						}
					}

					if (operation === 'createSubcodes') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						const subcodes = this.getNodeParameter('subcodes', i) as string;

						const body: IDataObject = {
							codes: subcodes.split(',').map((c: string) => c.trim()),
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/product_families/${productFamilyId}/coupons/${couponId}/codes.json`, body);
						responseData = (responseData as IDataObject).created_codes as IDataObject[];
					}

					if (operation === 'deleteSubcode') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						const subcode = this.getNodeParameter('subcode', i) as string;
						await maxioApiRequest.call(this, 'DELETE', `/product_families/${productFamilyId}/coupons/${couponId}/codes/${subcode}.json`);
						responseData = { success: true };
					}

					if (operation === 'getUsages') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const couponId = this.getNodeParameter('couponId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/coupons/${couponId}/usage.json`, {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/coupons/${couponId}/usage.json`, {}, { per_page: limit });
							responseData = response as IDataObject[];
						}
					}
				}

				// ========================================
				//            PRODUCT FAMILY
				// ========================================
				if (resource === 'productFamily') {
					if (operation === 'get') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}.json`);
						responseData = (responseData as IDataObject).product_family as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.dateField) qs.date_field = filters.dateField;
						if (filters.startDate) qs.start_date = filters.startDate;
						if (filters.endDate) qs.end_date = filters.endDate;
						if (filters.startDatetime) qs.start_datetime = filters.startDatetime;
						if (filters.endDatetime) qs.end_datetime = filters.endDatetime;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/product_families.json', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/product_families.json', {}, qs);
							responseData = (response as IDataObject[]).map((pf: IDataObject) => (pf as IDataObject).product_family as IDataObject);
						}
					}

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							product_family: {
								name,
								...convertKeysToSnakeCase(additionalFields),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/product_families.json', body);
						responseData = (responseData as IDataObject).product_family as IDataObject;
					}

					if (operation === 'update') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							product_family: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/product_families/${productFamilyId}.json`, body);
						responseData = (responseData as IDataObject).product_family as IDataObject;
					}

					if (operation === 'getProducts') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('productsFilters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.includeArchived) qs.include_archived = filters.includeArchived;
						if (filters.dateField) qs.date_field = filters.dateField;
						if (filters.startDate) qs.start_date = filters.startDate;
						if (filters.endDate) qs.end_date = filters.endDate;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/products.json`, {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/products.json`, {}, qs);
							responseData = (response as IDataObject[]).map((p: IDataObject) => (p as IDataObject).product as IDataObject);
						}
					}

					if (operation === 'getComponents') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('componentsFilters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.includeArchived) qs.include_archived = filters.includeArchived;
						if (filters.filterIds) qs['filter[ids]'] = filters.filterIds;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/components.json`, {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/components.json`, {}, qs);
							responseData = (response as IDataObject[]).map((c: IDataObject) => (c as IDataObject).component as IDataObject);
						}
					}

					if (operation === 'getCoupons') {
						const productFamilyId = this.getNodeParameter('productFamilyId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('couponsFilters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.currencyPrices) qs.currency_prices = filters.currencyPrices;
						if (filters.filterIds) qs['filter[ids]'] = filters.filterIds;
						if (filters.filterCodes) qs['filter[codes]'] = filters.filterCodes;
						if (filters.filterUseSiteExchangeRate) qs['filter[use_site_exchange_rate]'] = filters.filterUseSiteExchangeRate;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/product_families/${productFamilyId}/coupons.json`, {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/product_families/${productFamilyId}/coupons.json`, {}, qs);
							responseData = (response as IDataObject[]).map((c: IDataObject) => (c as IDataObject).coupon as IDataObject);
						}
					}
				}

				// ========================================
				//            STATEMENT
				// ========================================
				if (resource === 'statement') {
					if (operation === 'get') {
						const statementId = this.getNodeParameter('statementId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/statements/${statementId}.json`);
						responseData = (responseData as IDataObject).statement as IDataObject;
					}

					if (operation === 'getAll') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.sort) qs.sort = filters.sort;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', `/subscriptions/${subscriptionId}/statements.json`, {}, qs, 'statements');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/statements.json`, {}, qs);
							responseData = (response as IDataObject[]).map((s: IDataObject) => (s as IDataObject).statement as IDataObject);
						}
					}

					if (operation === 'getIds') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as number;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;

						const qs: IDataObject = {
							start_date: startDate,
							end_date: endDate,
						};

						responseData = await maxioApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}/statements/ids.json`, {}, qs);
					}
				}

				// ========================================
				//            TRANSACTION
				// ========================================
				if (resource === 'transaction') {
					if (operation === 'get') {
						const transactionId = this.getNodeParameter('transactionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'GET', `/transactions/${transactionId}.json`);
						responseData = (responseData as IDataObject).transaction as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.subscriptionId) qs.subscription_id = filters.subscriptionId;
						if (filters.filterTypes && (filters.filterTypes as string[]).length > 0) {
							qs['filter[type]'] = (filters.filterTypes as string[]).join(',');
						}
						if (filters.filterKinds && (filters.filterKinds as string[]).length > 0) {
							qs['filter[kinds]'] = (filters.filterKinds as string[]).join(',');
						}
						if (filters.direction) qs.direction = filters.direction;
						if (filters.sort) qs.sort = filters.sort;
						if (filters.sinceId) qs.since_id = filters.sinceId;
						if (filters.maxId) qs.max_id = filters.maxId;
						if (filters.sinceDate) qs.since_date = filters.sinceDate;
						if (filters.untilDate) qs.until_date = filters.untilDate;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/transactions.json', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/transactions.json', {}, qs);
							responseData = (response as IDataObject[]).map((t: IDataObject) => (t as IDataObject).transaction as IDataObject);
						}
					}

					if (operation === 'refund') {
						const transactionId = this.getNodeParameter('transactionId', i) as number;
						const amountInCents = this.getNodeParameter('amountInCents', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							refund: {
								amount_in_cents: amountInCents,
								...convertKeysToSnakeCase(additionalFields),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', `/transactions/${transactionId}/refund.json`, body);
						responseData = (responseData as IDataObject).refund as IDataObject;
					}

					if (operation === 'void') {
						const transactionId = this.getNodeParameter('transactionId', i) as number;
						responseData = await maxioApiRequest.call(this, 'POST', `/transactions/${transactionId}/void.json`);
						responseData = (responseData as IDataObject).transaction as IDataObject;
					}
				}

				// ========================================
				//            WEBHOOK
				// ========================================
				if (resource === 'webhook') {
					if (operation === 'getEndpoints') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/endpoints.json', {}, {}, 'endpoints');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await maxioApiRequest.call(this, 'GET', '/endpoints.json', {}, { per_page: limit });
							responseData = (response as IDataObject).endpoints as IDataObject[];
						}
					}

					if (operation === 'createEndpoint') {
						const url = this.getNodeParameter('url', i) as string;
						const webhookSubscriptions = this.getNodeParameter('webhookSubscriptions', i) as string[];
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							endpoint: {
								url,
								webhook_subscriptions: webhookSubscriptions,
								...convertKeysToSnakeCase(additionalFields),
							},
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/endpoints.json', body);
						responseData = (responseData as IDataObject).endpoint as IDataObject;
					}

					if (operation === 'updateEndpoint') {
						const endpointId = this.getNodeParameter('endpointId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							endpoint: convertKeysToSnakeCase(updateFields),
						};

						responseData = await maxioApiRequest.call(this, 'PUT', `/endpoints/${endpointId}.json`, body);
						responseData = (responseData as IDataObject).endpoint as IDataObject;
					}

					if (operation === 'deleteEndpoint') {
						const endpointId = this.getNodeParameter('endpointId', i) as number;
						await maxioApiRequest.call(this, 'DELETE', `/endpoints/${endpointId}.json`);
						responseData = { success: true };
					}

					if (operation === 'enableWebhooks') {
						const enabled = this.getNodeParameter('enabled', i) as boolean;

						const body: IDataObject = {
							webhooks_enabled: enabled,
						};

						responseData = await maxioApiRequest.call(this, 'PUT', '/webhooks/settings.json', body);
					}

					if (operation === 'listWebhooks') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const qs: IDataObject = {};

						if (filters.status) qs.status = filters.status;
						if (filters.sinceDate) qs.since_date = filters.sinceDate;
						if (filters.untilDate) qs.until_date = filters.untilDate;
						if (filters.order) qs.order = filters.order;
						if (filters.subscriptionId) qs.subscription = filters.subscriptionId;

						if (returnAll) {
							responseData = await maxioApiRequestAllItems.call(this, 'GET', '/webhooks.json', {}, qs, 'webhooks');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.per_page = limit;
							const response = await maxioApiRequest.call(this, 'GET', '/webhooks.json', {}, qs);
							responseData = (response as IDataObject).webhooks as IDataObject[];
						}
					}

					if (operation === 'replayWebhooks') {
						const webhookIds = this.getNodeParameter('webhookIds', i) as string;

						const body: IDataObject = {
							ids: webhookIds.split(',').map((id: string) => parseInt(id.trim(), 10)),
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/webhooks/replay.json', body);
					}
				}

				// ========================================
				//            SITE
				// ========================================
				if (resource === 'site') {
					if (operation === 'get') {
						responseData = await maxioApiRequest.call(this, 'GET', '/site.json');
						responseData = (responseData as IDataObject).site as IDataObject;
					}

					if (operation === 'clearData') {
						const cleanupScope = this.getNodeParameter('cleanupScope', i) as string;
						const confirmClearData = this.getNodeParameter('confirmClearData', i) as boolean;

						if (!confirmClearData) {
							throw new Error('You must confirm the clear data action by checking the confirmation checkbox');
						}

						const body: IDataObject = {
							cleanup_scope: cleanupScope,
						};

						responseData = await maxioApiRequest.call(this, 'POST', '/sites/clear_data.json', body);
					}

					if (operation === 'getStats') {
						responseData = await maxioApiRequest.call(this, 'GET', '/stats.json');
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
