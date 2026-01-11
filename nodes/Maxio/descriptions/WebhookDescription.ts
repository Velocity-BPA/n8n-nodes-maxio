/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create Endpoint',
				value: 'createEndpoint',
				description: 'Create a webhook endpoint',
				action: 'Create a webhook endpoint',
			},
			{
				name: 'Delete Endpoint',
				value: 'deleteEndpoint',
				description: 'Delete a webhook endpoint',
				action: 'Delete a webhook endpoint',
			},
			{
				name: 'Enable Webhooks',
				value: 'enableWebhooks',
				description: 'Enable webhooks for the site',
				action: 'Enable webhooks',
			},
			{
				name: 'Get Endpoints',
				value: 'getEndpoints',
				description: 'Get many webhook endpoints',
				action: 'Get webhook endpoints',
			},
			{
				name: 'List Webhooks',
				value: 'listWebhooks',
				description: 'List recent webhook deliveries',
				action: 'List webhooks',
			},
			{
				name: 'Replay Webhooks',
				value: 'replayWebhooks',
				description: 'Replay failed webhooks',
				action: 'Replay webhooks',
			},
			{
				name: 'Update Endpoint',
				value: 'updateEndpoint',
				description: 'Update a webhook endpoint',
				action: 'Update a webhook endpoint',
			},
		],
		default: 'getEndpoints',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//         webhook:getEndpoints
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getEndpoints', 'listWebhooks'],
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
				resource: ['webhook'],
				operation: ['getEndpoints', 'listWebhooks'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         webhook:createEndpoint
	// ----------------------------------
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createEndpoint'],
			},
		},
		description: 'The webhook endpoint URL',
	},
	{
		displayName: 'Webhook Subscriptions',
		name: 'webhookSubscriptions',
		type: 'multiOptions',
		required: true,
		options: [
			{ name: 'Billing Date Change', value: 'billing_date_change' },
			{ name: 'Component Allocation Change', value: 'component_allocation_change' },
			{ name: 'Customer Create', value: 'customer_create' },
			{ name: 'Customer Delete', value: 'customer_delete' },
			{ name: 'Customer Update', value: 'customer_update' },
			{ name: 'Delayed Signup Creation Failure', value: 'delayed_signup_creation_failure' },
			{ name: 'Delayed Signup Creation Success', value: 'delayed_signup_creation_success' },
			{ name: 'Dunning Step Reached', value: 'dunning_step_reached' },
			{ name: 'Expiration Date Change', value: 'expiration_date_change' },
			{ name: 'Expiring Card', value: 'expiring_card' },
			{ name: 'Invoice Issued', value: 'invoice_issued' },
			{ name: 'Metered Usage', value: 'metered_usage' },
			{ name: 'Payment Failure', value: 'payment_failure' },
			{ name: 'Payment Success', value: 'payment_success' },
			{ name: 'Pending Cancellation Change', value: 'pending_cancellation_change' },
			{ name: 'Prepaid Subscription Balance Changed', value: 'prepaid_subscription_balance_changed' },
			{ name: 'Prepaid Usage', value: 'prepaid_usage' },
			{ name: 'Refund Failure', value: 'refund_failure' },
			{ name: 'Refund Success', value: 'refund_success' },
			{ name: 'Renewal Failure', value: 'renewal_failure' },
			{ name: 'Renewal Success', value: 'renewal_success' },
			{ name: 'Signup Failure', value: 'signup_failure' },
			{ name: 'Signup Success', value: 'signup_success' },
			{ name: 'Statement Closed', value: 'statement_closed' },
			{ name: 'Statement Settled', value: 'statement_settled' },
			{ name: 'Subscription Card Update', value: 'subscription_card_update' },
			{ name: 'Subscription Group Signup Failure', value: 'subscription_group_signup_failure' },
			{ name: 'Subscription Group Signup Success', value: 'subscription_group_signup_success' },
			{ name: 'Subscription Product Change', value: 'subscription_product_change' },
			{ name: 'Subscription State Change', value: 'subscription_state_change' },
			{ name: 'Upcoming Renewal Notice', value: 'upcoming_renewal_notice' },
			{ name: 'Upgrade Downgrade Failure', value: 'upgrade_downgrade_failure' },
			{ name: 'Upgrade Downgrade Success', value: 'upgrade_downgrade_success' },
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createEndpoint'],
			},
		},
		description: 'Events to subscribe to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createEndpoint'],
			},
		},
		options: [
			{
				displayName: 'Basic Auth Username',
				name: 'basicAuthUsername',
				type: 'string',
				default: '',
				description: 'HTTP Basic Auth username',
			},
			{
				displayName: 'Basic Auth Password',
				name: 'basicAuthPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'HTTP Basic Auth password',
			},
		],
	},

	// ----------------------------------
	//         webhook:updateEndpoint
	// ----------------------------------
	{
		displayName: 'Endpoint ID',
		name: 'endpointId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['updateEndpoint', 'deleteEndpoint'],
			},
		},
		description: 'The webhook endpoint ID',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['updateEndpoint'],
			},
		},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The webhook endpoint URL',
			},
			{
				displayName: 'Webhook Subscriptions',
				name: 'webhookSubscriptions',
				type: 'multiOptions',
				options: [
					{ name: 'Billing Date Change', value: 'billing_date_change' },
					{ name: 'Component Allocation Change', value: 'component_allocation_change' },
					{ name: 'Customer Create', value: 'customer_create' },
					{ name: 'Customer Delete', value: 'customer_delete' },
					{ name: 'Customer Update', value: 'customer_update' },
					{ name: 'Dunning Step Reached', value: 'dunning_step_reached' },
					{ name: 'Invoice Issued', value: 'invoice_issued' },
					{ name: 'Payment Failure', value: 'payment_failure' },
					{ name: 'Payment Success', value: 'payment_success' },
					{ name: 'Refund Failure', value: 'refund_failure' },
					{ name: 'Refund Success', value: 'refund_success' },
					{ name: 'Renewal Failure', value: 'renewal_failure' },
					{ name: 'Renewal Success', value: 'renewal_success' },
					{ name: 'Signup Failure', value: 'signup_failure' },
					{ name: 'Signup Success', value: 'signup_success' },
					{ name: 'Subscription State Change', value: 'subscription_state_change' },
					{ name: 'Upgrade Downgrade Failure', value: 'upgrade_downgrade_failure' },
					{ name: 'Upgrade Downgrade Success', value: 'upgrade_downgrade_success' },
				],
				default: [],
				description: 'Events to subscribe to',
			},
			{
				displayName: 'Basic Auth Username',
				name: 'basicAuthUsername',
				type: 'string',
				default: '',
				description: 'HTTP Basic Auth username',
			},
			{
				displayName: 'Basic Auth Password',
				name: 'basicAuthPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'HTTP Basic Auth password',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the endpoint is enabled',
			},
		],
	},

	// ----------------------------------
	//         webhook:enableWebhooks
	// ----------------------------------
	{
		displayName: 'Enable',
		name: 'enabled',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['enableWebhooks'],
			},
		},
		description: 'Whether to enable or disable webhooks',
	},

	// ----------------------------------
	//         webhook:listWebhooks
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['listWebhooks'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Successful', value: 'successful' },
					{ name: 'Failed', value: 'failed' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Paused', value: 'paused' },
				],
				default: 'all',
				description: 'Filter by webhook delivery status',
			},
			{
				displayName: 'Since Date',
				name: 'sinceDate',
				type: 'dateTime',
				default: '',
				description: 'Return webhooks since this date',
			},
			{
				displayName: 'Until Date',
				name: 'untilDate',
				type: 'dateTime',
				default: '',
				description: 'Return webhooks until this date',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Newest First', value: 'newest_first' },
					{ name: 'Oldest First', value: 'oldest_first' },
				],
				default: 'newest_first',
				description: 'Sort order',
			},
			{
				displayName: 'Subscription ID',
				name: 'subscriptionId',
				type: 'number',
				default: 0,
				description: 'Filter by subscription ID',
			},
		],
	},

	// ----------------------------------
	//         webhook:replayWebhooks
	// ----------------------------------
	{
		displayName: 'Webhook IDs',
		name: 'webhookIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['replayWebhooks'],
			},
		},
		description: 'Comma-separated list of webhook IDs to replay',
	},
];
