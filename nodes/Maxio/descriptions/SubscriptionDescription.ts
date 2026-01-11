/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const subscriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
			},
		},
		options: [
			{
				name: 'Add Coupon',
				value: 'addCoupon',
				description: 'Apply a coupon to a subscription',
				action: 'Add coupon to subscription',
			},
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a subscription',
				action: 'Cancel a subscription',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new subscription',
				action: 'Create a subscription',
			},
			{
				name: 'Create Prepayment',
				value: 'createPrepayment',
				description: 'Add prepayment to a subscription',
				action: 'Create prepayment for subscription',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a subscription by ID',
				action: 'Get a subscription',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many subscriptions',
				action: 'Get many subscriptions',
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				description: 'Get subscription events',
				action: 'Get subscription events',
			},
			{
				name: 'Get Metadata',
				value: 'getMetadata',
				description: 'Get subscription metadata',
				action: 'Get subscription metadata',
			},
			{
				name: 'Get Prepayments',
				value: 'getPrepayments',
				description: 'Get prepayment balance for a subscription',
				action: 'Get prepayments for subscription',
			},
			{
				name: 'Override',
				value: 'override',
				description: 'Admin override subscription settings',
				action: 'Override subscription settings',
			},
			{
				name: 'Preview Migration',
				value: 'previewMigration',
				description: 'Preview a product migration',
				action: 'Preview subscription migration',
			},
			{
				name: 'Preview Renewal',
				value: 'previewRenewal',
				description: 'Preview the next renewal',
				action: 'Preview subscription renewal',
			},
			{
				name: 'Reactivate',
				value: 'reactivate',
				description: 'Reactivate a canceled subscription',
				action: 'Reactivate a subscription',
			},
			{
				name: 'Refund Prepayment',
				value: 'refundPrepayment',
				description: 'Refund prepayment from a subscription',
				action: 'Refund prepayment from subscription',
			},
			{
				name: 'Remove Coupon',
				value: 'removeCoupon',
				description: 'Remove a coupon from a subscription',
				action: 'Remove coupon from subscription',
			},
			{
				name: 'Reset Balance',
				value: 'resetBalance',
				description: 'Reset subscription balance to zero',
				action: 'Reset subscription balance',
			},
			{
				name: 'Set Metadata',
				value: 'setMetadata',
				description: 'Set subscription metadata',
				action: 'Set subscription metadata',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a subscription',
				action: 'Update a subscription',
			},
			{
				name: 'Update Payment Profile',
				value: 'updatePaymentProfile',
				description: 'Change the payment method for a subscription',
				action: 'Update subscription payment profile',
			},
			{
				name: 'Update Product',
				value: 'updateProduct',
				description: 'Change the product for a subscription',
				action: 'Update subscription product',
			},
		],
		default: 'get',
	},
];

export const subscriptionFields: INodeProperties[] = [
	// ----------------------------------
	//         subscription:get
	// ----------------------------------
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: [
					'get',
					'update',
					'cancel',
					'reactivate',
					'resetBalance',
					'updateProduct',
					'updatePaymentProfile',
					'previewRenewal',
					'previewMigration',
					'addCoupon',
					'removeCoupon',
					'getPrepayments',
					'createPrepayment',
					'refundPrepayment',
					'getEvents',
					'getMetadata',
					'setMetadata',
					'override',
				],
			},
		},
		description: 'The ID of the subscription',
	},

	// ----------------------------------
	//         subscription:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Canceled', value: 'canceled' },
					{ name: 'Expired', value: 'expired' },
					{ name: 'On Hold', value: 'on_hold' },
					{ name: 'Past Due', value: 'past_due' },
					{ name: 'Paused', value: 'paused' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Soft Failure', value: 'soft_failure' },
					{ name: 'Trial Ended', value: 'trial_ended' },
					{ name: 'Trialing', value: 'trialing' },
					{ name: 'Unpaid', value: 'unpaid' },
				],
				default: 'active',
				description: 'Filter by subscription state',
			},
			{
				displayName: 'Product ID',
				name: 'product',
				type: 'number',
				default: 0,
				description: 'Filter by product ID',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'number',
				default: 0,
				description: 'Filter by customer ID',
			},
			{
				displayName: 'Date Field',
				name: 'dateField',
				type: 'options',
				options: [
					{ name: 'Current Period Ends At', value: 'current_period_ends_at' },
					{ name: 'Current Period Starts At', value: 'current_period_starts_at' },
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Activated At', value: 'activated_at' },
					{ name: 'Canceled At', value: 'canceled_at' },
					{ name: 'Expires At', value: 'expires_at' },
					{ name: 'Trial Started At', value: 'trial_started_at' },
					{ name: 'Trial Ended At', value: 'trial_ended_at' },
					{ name: 'Updated At', value: 'updated_at' },
				],
				default: 'created_at',
				description: 'The type of date field to filter by',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter subscriptions with a date on or after this value',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter subscriptions with a date on or before this value',
			},
			{
				displayName: 'Sort Field',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Updated At', value: 'updated_at' },
					{ name: 'Signup Date', value: 'signup_date' },
				],
				default: 'created_at',
				description: 'Field to sort by',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort direction',
			},
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				options: [
					{ name: 'Coupons', value: 'coupons' },
					{ name: 'Self Service Page Token', value: 'self_service_page_token' },
				],
				default: [],
				description: 'Additional data to include in the response',
			},
		],
	},

	// ----------------------------------
	//         subscription:create
	// ----------------------------------
	{
		displayName: 'Product ID or Handle',
		name: 'productIdentifier',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		description: 'The product ID (number) or handle (string) for the subscription',
	},
	{
		displayName: 'Customer',
		name: 'customerSource',
		type: 'options',
		required: true,
		default: 'new',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'New Customer',
				value: 'new',
				description: 'Create a new customer with the subscription',
			},
			{
				name: 'Existing Customer',
				value: 'existing',
				description: 'Use an existing customer ID',
			},
		],
		description: 'Whether to create a new customer or use an existing one',
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
				customerSource: ['existing'],
			},
		},
		description: 'The ID of the existing customer',
	},
	{
		displayName: 'Customer Details',
		name: 'customerDetails',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
				customerSource: ['new'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Customer first name',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Customer last name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Customer email address',
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
				description: 'Company or organization name',
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				description: 'External reference ID for the customer',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Customer phone number',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Street address',
			},
			{
				displayName: 'Address Line 2',
				name: 'address2',
				type: 'string',
				default: '',
				description: 'Additional address information',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City name',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State or province',
			},
			{
				displayName: 'ZIP/Postal Code',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'ZIP or postal code',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country code (e.g., US, CA, GB)',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Payment Collection Method',
				name: 'paymentCollectionMethod',
				type: 'options',
				options: [
					{ name: 'Automatic', value: 'automatic' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Remittance', value: 'remittance' },
				],
				default: 'automatic',
				description: 'How payments are collected',
			},
			{
				displayName: 'Payment Profile ID',
				name: 'paymentProfileId',
				type: 'number',
				default: 0,
				description: 'Existing payment profile to use',
			},
			{
				displayName: 'Coupon Code',
				name: 'couponCode',
				type: 'string',
				default: '',
				description: 'Coupon code to apply',
			},
			{
				displayName: 'Referral Code',
				name: 'referralCode',
				type: 'string',
				default: '',
				description: 'Referral code from another subscription',
			},
			{
				displayName: 'Next Billing At',
				name: 'nextBillingAt',
				type: 'dateTime',
				default: '',
				description: 'Set the next billing date',
			},
			{
				displayName: 'Activated At',
				name: 'activatedAt',
				type: 'dateTime',
				default: '',
				description: 'Set the activation date',
			},
			{
				displayName: 'Cancel At End of Period',
				name: 'cancelAtEndOfPeriod',
				type: 'boolean',
				default: false,
				description: 'Whether to cancel at the end of the billing period',
			},
			{
				displayName: 'Receives Invoice Emails',
				name: 'receivesInvoiceEmails',
				type: 'boolean',
				default: true,
				description: 'Whether the subscription receives invoice emails',
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				description: 'External reference for the subscription',
			},
			{
				displayName: 'Net Terms',
				name: 'netTerms',
				type: 'number',
				default: 0,
				description: 'Number of days until payment is due',
			},
		],
	},

	// ----------------------------------
	//         subscription:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Payment Collection Method',
				name: 'paymentCollectionMethod',
				type: 'options',
				options: [
					{ name: 'Automatic', value: 'automatic' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Remittance', value: 'remittance' },
				],
				default: 'automatic',
				description: 'How payments are collected',
			},
			{
				displayName: 'Next Billing At',
				name: 'nextBillingAt',
				type: 'dateTime',
				default: '',
				description: 'Set the next billing date',
			},
			{
				displayName: 'Receives Invoice Emails',
				name: 'receivesInvoiceEmails',
				type: 'boolean',
				default: true,
				description: 'Whether the subscription receives invoice emails',
			},
			{
				displayName: 'Net Terms',
				name: 'netTerms',
				type: 'number',
				default: 0,
				description: 'Number of days until payment is due',
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				description: 'External reference for the subscription',
			},
			{
				displayName: 'Snap Day',
				name: 'snapDay',
				type: 'string',
				default: '',
				description: 'Day of month for billing (1-28 or "end")',
			},
		],
	},

	// ----------------------------------
	//         subscription:cancel
	// ----------------------------------
	{
		displayName: 'Cancel Options',
		name: 'cancelOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['cancel'],
			},
		},
		options: [
			{
				displayName: 'Cancellation Method',
				name: 'cancellationMethod',
				type: 'options',
				options: [
					{ name: 'Immediate', value: 'immediate' },
					{ name: 'End of Period', value: 'end_of_period' },
				],
				default: 'immediate',
				description: 'When to cancel the subscription',
			},
			{
				displayName: 'Cancellation Message',
				name: 'cancellationMessage',
				type: 'string',
				default: '',
				description: 'Reason for cancellation',
			},
			{
				displayName: 'Reason Code',
				name: 'reasonCode',
				type: 'string',
				default: '',
				description: 'Code for the cancellation reason',
			},
		],
	},

	// ----------------------------------
	//         subscription:reactivate
	// ----------------------------------
	{
		displayName: 'Reactivate Options',
		name: 'reactivateOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['reactivate'],
			},
		},
		options: [
			{
				displayName: 'Include Trial',
				name: 'includeTrial',
				type: 'boolean',
				default: false,
				description: 'Whether to include a trial period',
			},
			{
				displayName: 'Preserve Balance',
				name: 'preserveBalance',
				type: 'boolean',
				default: false,
				description: 'Whether to preserve existing balance',
			},
			{
				displayName: 'Coupon Code',
				name: 'couponCode',
				type: 'string',
				default: '',
				description: 'Coupon to apply upon reactivation',
			},
			{
				displayName: 'Resume',
				name: 'resume',
				type: 'boolean',
				default: false,
				description: 'Whether this is resuming a paused subscription',
			},
		],
	},

	// ----------------------------------
	//         subscription:updateProduct
	// ----------------------------------
	{
		displayName: 'New Product ID',
		name: 'newProductId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['updateProduct'],
			},
		},
		description: 'The ID of the product to migrate to',
	},
	{
		displayName: 'Migration Options',
		name: 'migrationOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['updateProduct'],
			},
		},
		options: [
			{
				displayName: 'Include Trial',
				name: 'includeTrial',
				type: 'boolean',
				default: false,
				description: 'Whether to include the new product trial',
			},
			{
				displayName: 'Include Initial Charge',
				name: 'includeInitialCharge',
				type: 'boolean',
				default: false,
				description: 'Whether to include the setup fee',
			},
			{
				displayName: 'Include Coupons',
				name: 'includeCoupons',
				type: 'boolean',
				default: true,
				description: 'Whether to apply existing coupons to the new product',
			},
			{
				displayName: 'Preserve Period',
				name: 'preservePeriod',
				type: 'boolean',
				default: false,
				description: 'Whether to preserve the current billing period',
			},
			{
				displayName: 'Proration Date',
				name: 'prorationDate',
				type: 'dateTime',
				default: '',
				description: 'Custom proration date for the migration',
			},
		],
	},

	// ----------------------------------
	//         subscription:updatePaymentProfile
	// ----------------------------------
	{
		displayName: 'Payment Profile ID',
		name: 'paymentProfileId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['updatePaymentProfile'],
			},
		},
		description: 'The ID of the payment profile to use',
	},

	// ----------------------------------
	//         subscription:previewMigration
	// ----------------------------------
	{
		displayName: 'Target Product ID',
		name: 'targetProductId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['previewMigration'],
			},
		},
		description: 'The ID of the product to migrate to',
	},

	// ----------------------------------
	//         subscription:addCoupon
	// ----------------------------------
	{
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['addCoupon'],
			},
		},
		description: 'The coupon code to apply',
	},

	// ----------------------------------
	//         subscription:removeCoupon
	// ----------------------------------
	{
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['removeCoupon'],
			},
		},
		description: 'The coupon code to remove',
	},

	// ----------------------------------
	//         subscription:createPrepayment
	// ----------------------------------
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['createPrepayment'],
			},
		},
		description: 'Amount of prepayment in cents',
	},
	{
		displayName: 'Memo',
		name: 'memo',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['createPrepayment'],
			},
		},
		description: 'Description of the prepayment',
	},
	{
		displayName: 'Prepayment Options',
		name: 'prepaymentOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['createPrepayment'],
			},
		},
		options: [
			{
				displayName: 'Method',
				name: 'method',
				type: 'options',
				options: [
					{ name: 'Check', value: 'check' },
					{ name: 'Cash', value: 'cash' },
					{ name: 'Money Order', value: 'money_order' },
					{ name: 'ACH', value: 'ach' },
					{ name: 'Credit Card', value: 'credit_card' },
					{ name: 'PayPal Account', value: 'paypal_account' },
					{ name: 'Other', value: 'other' },
				],
				default: 'other',
				description: 'Payment method used for the prepayment',
			},
		],
	},

	// ----------------------------------
	//         subscription:refundPrepayment
	// ----------------------------------
	{
		displayName: 'Prepayment ID',
		name: 'prepaymentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['refundPrepayment'],
			},
		},
		description: 'The ID of the prepayment to refund',
	},
	{
		displayName: 'Refund Amount',
		name: 'refundAmount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['refundPrepayment'],
			},
		},
		description: 'Amount to refund in cents',
	},

	// ----------------------------------
	//         subscription:getEvents
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['getEvents'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['getEvents'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         subscription:setMetadata
	// ----------------------------------
	{
		displayName: 'Metadata',
		name: 'metadata',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['setMetadata'],
			},
		},
		options: [
			{
				displayName: 'Metadata Fields',
				name: 'metadataFields',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Metadata field name',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Metadata field value',
					},
				],
			},
		],
		description: 'Metadata to set on the subscription',
	},

	// ----------------------------------
	//         subscription:override
	// ----------------------------------
	{
		displayName: 'Override Fields',
		name: 'overrideFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['override'],
			},
		},
		options: [
			{
				displayName: 'Activated At',
				name: 'activatedAt',
				type: 'dateTime',
				default: '',
				description: 'Override the activation date',
			},
			{
				displayName: 'Canceled At',
				name: 'canceledAt',
				type: 'dateTime',
				default: '',
				description: 'Override the cancellation date',
			},
			{
				displayName: 'Cancellation Message',
				name: 'cancellationMessage',
				type: 'string',
				default: '',
				description: 'Override the cancellation message',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'dateTime',
				default: '',
				description: 'Override the expiration date',
			},
			{
				displayName: 'Current Period Starts At',
				name: 'currentPeriodStartsAt',
				type: 'dateTime',
				default: '',
				description: 'Override the period start date',
			},
		],
	},
];
