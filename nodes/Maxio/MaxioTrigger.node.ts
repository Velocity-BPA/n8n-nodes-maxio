/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import * as crypto from 'crypto';
import { maxioApiRequest } from './GenericFunctions';

export class MaxioTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Maxio Trigger',
		name: 'maxioTrigger',
		icon: 'file:maxio.svg',
		group: ['trigger'],
		version: 1,
		description: 'Receive Maxio webhook events',
		defaults: {
			name: 'Maxio Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'maxioApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Billing Date Change',
						value: 'billing_date_change',
						description: 'Triggered when a subscription billing date changes',
					},
					{
						name: 'Component Allocation Change',
						value: 'component_allocation_change',
						description: 'Triggered when a component allocation is modified',
					},
					{
						name: 'Customer Create',
						value: 'customer_create',
						description: 'Triggered when a new customer is created',
					},
					{
						name: 'Customer Delete',
						value: 'customer_delete',
						description: 'Triggered when a customer is deleted',
					},
					{
						name: 'Customer Update',
						value: 'customer_update',
						description: 'Triggered when a customer is updated',
					},
					{
						name: 'Delayed Signup Creation Failure',
						value: 'delayed_signup_creation_failure',
						description: 'Triggered when a delayed signup fails',
					},
					{
						name: 'Delayed Signup Creation Success',
						value: 'delayed_signup_creation_success',
						description: 'Triggered when a delayed signup succeeds',
					},
					{
						name: 'Dunning Step Reached',
						value: 'dunning_step_reached',
						description: 'Triggered when a dunning milestone is reached',
					},
					{
						name: 'Expiration Date Change',
						value: 'expiration_date_change',
						description: 'Triggered when subscription expiration date changes',
					},
					{
						name: 'Expiring Card',
						value: 'expiring_card',
						description: 'Triggered when a payment card is expiring soon',
					},
					{
						name: 'Invoice Issued',
						value: 'invoice_issued',
						description: 'Triggered when an invoice is issued',
					},
					{
						name: 'Metered Usage',
						value: 'metered_usage',
						description: 'Triggered when usage is recorded for a metered component',
					},
					{
						name: 'Payment Failure',
						value: 'payment_failure',
						description: 'Triggered when a payment fails',
					},
					{
						name: 'Payment Success',
						value: 'payment_success',
						description: 'Triggered when a payment succeeds',
					},
					{
						name: 'Pending Cancellation Change',
						value: 'pending_cancellation_change',
						description: 'Triggered when pending cancellation status changes',
					},
					{
						name: 'Prepaid Subscription Balance Changed',
						value: 'prepaid_subscription_balance_changed',
						description: 'Triggered when prepaid balance changes',
					},
					{
						name: 'Prepaid Usage',
						value: 'prepaid_usage',
						description: 'Triggered when prepaid usage occurs',
					},
					{
						name: 'Refund Failure',
						value: 'refund_failure',
						description: 'Triggered when a refund fails',
					},
					{
						name: 'Refund Success',
						value: 'refund_success',
						description: 'Triggered when a refund succeeds',
					},
					{
						name: 'Renewal Failure',
						value: 'renewal_failure',
						description: 'Triggered when a renewal fails',
					},
					{
						name: 'Renewal Success',
						value: 'renewal_success',
						description: 'Triggered when a renewal succeeds',
					},
					{
						name: 'Signup Failure',
						value: 'signup_failure',
						description: 'Triggered when a signup fails',
					},
					{
						name: 'Signup Success',
						value: 'signup_success',
						description: 'Triggered when a signup succeeds',
					},
					{
						name: 'Statement Closed',
						value: 'statement_closed',
						description: 'Triggered when a statement is closed',
					},
					{
						name: 'Statement Settled',
						value: 'statement_settled',
						description: 'Triggered when a statement is settled',
					},
					{
						name: 'Subscription Card Update',
						value: 'subscription_card_update',
						description: 'Triggered when a subscription payment card is updated',
					},
					{
						name: 'Subscription Group Signup Failure',
						value: 'subscription_group_signup_failure',
						description: 'Triggered when a group signup fails',
					},
					{
						name: 'Subscription Group Signup Success',
						value: 'subscription_group_signup_success',
						description: 'Triggered when a group signup succeeds',
					},
					{
						name: 'Subscription Product Change',
						value: 'subscription_product_change',
						description: 'Triggered when a subscription product is changed',
					},
					{
						name: 'Subscription State Change',
						value: 'subscription_state_change',
						description: 'Triggered when a subscription state changes',
					},
					{
						name: 'Upcoming Renewal Notice',
						value: 'upcoming_renewal_notice',
						description: 'Triggered when a renewal is approaching',
					},
					{
						name: 'Upgrade Downgrade Failure',
						value: 'upgrade_downgrade_failure',
						description: 'Triggered when a migration fails',
					},
					{
						name: 'Upgrade Downgrade Success',
						value: 'upgrade_downgrade_success',
						description: 'Triggered when a migration succeeds',
					},
				],
				description: 'The events to listen for',
			},
			{
				displayName: 'Shared Key',
				name: 'sharedKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Optional shared key for webhook signature verification',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');

				// Get existing endpoints
				try {
					const response = await maxioApiRequest.call(this, 'GET', '/endpoints.json');
					const endpoints = (response as IDataObject).endpoints as IDataObject[] || response as IDataObject[];

					for (const endpoint of endpoints) {
						if ((endpoint as IDataObject).url === webhookUrl) {
							webhookData.webhookId = (endpoint as IDataObject).id;
							return true;
						}
					}
				} catch (error) {
					return false;
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events') as string[];
				const webhookData = this.getWorkflowStaticData('node');

				const body: IDataObject = {
					endpoint: {
						url: webhookUrl,
						webhook_subscriptions: events,
					},
				};

				try {
					const response = await maxioApiRequest.call(this, 'POST', '/endpoints.json', body);
					const endpoint = (response as IDataObject).endpoint as IDataObject;
					webhookData.webhookId = endpoint.id;
					return true;
				} catch (error) {
					return false;
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId) {
					try {
						await maxioApiRequest.call(this, 'DELETE', `/endpoints/${webhookData.webhookId}.json`);
					} catch (error) {
						return false;
					}
				}

				delete webhookData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const headerData = this.getHeaderData() as IDataObject;
		const req = this.getRequestObject();

		// Optional signature verification
		const sharedKey = this.getNodeParameter('sharedKey', '') as string;
		if (sharedKey) {
			const signature = headerData['x-chargify-webhook-signature-hmac-sha-256'] as string;
			if (signature) {
				const rawBody = req.rawBody?.toString() || JSON.stringify(bodyData);
				const expectedSignature = crypto
					.createHmac('sha256', sharedKey)
					.update(rawBody)
					.digest('hex');

				if (signature !== expectedSignature) {
					return {
						webhookResponse: 'Invalid signature',
					};
				}
			}
		}

		// Check if this is an event we're subscribed to
		const events = this.getNodeParameter('events') as string[];
		const eventType = bodyData.event as string;

		if (events.length > 0 && !events.includes(eventType)) {
			return {
				webhookResponse: 'Event not subscribed',
			};
		}

		return {
			workflowData: [
				this.helpers.returnJsonArray(bodyData),
			],
		};
	}
}
