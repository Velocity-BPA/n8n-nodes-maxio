/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a transaction by ID',
				action: 'Get a transaction',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many transactions',
				action: 'Get many transactions',
			},
			{
				name: 'Refund',
				value: 'refund',
				description: 'Refund a transaction',
				action: 'Refund a transaction',
			},
			{
				name: 'Void',
				value: 'void',
				description: 'Void a transaction',
				action: 'Void a transaction',
			},
		],
		default: 'get',
	},
];

export const transactionFields: INodeProperties[] = [
	// ----------------------------------
	//         transaction:get
	// ----------------------------------
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get', 'refund', 'void'],
			},
		},
		description: 'The transaction ID',
	},

	// ----------------------------------
	//         transaction:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['transaction'],
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
				resource: ['transaction'],
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
				resource: ['transaction'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Subscription ID',
				name: 'subscriptionId',
				type: 'number',
				default: 0,
				description: 'Filter by subscription ID',
			},
			{
				displayName: 'Transaction Types',
				name: 'filterTypes',
				type: 'multiOptions',
				options: [
					{ name: 'Charge', value: 'charge' },
					{ name: 'Payment', value: 'payment' },
					{ name: 'Refund', value: 'refund' },
					{ name: 'Credit', value: 'credit' },
					{ name: 'Adjustment', value: 'adjustment' },
					{ name: 'Info Transaction', value: 'info_transaction' },
				],
				default: [],
				description: 'Filter by transaction types',
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
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Amount', value: 'amount_in_cents' },
				],
				default: 'created_at',
				description: 'Field to sort by',
			},
			{
				displayName: 'Since ID',
				name: 'sinceId',
				type: 'number',
				default: 0,
				description: 'Return transactions since this ID',
			},
			{
				displayName: 'Max ID',
				name: 'maxId',
				type: 'number',
				default: 0,
				description: 'Return transactions with ID less than this',
			},
			{
				displayName: 'Since Date',
				name: 'sinceDate',
				type: 'dateTime',
				default: '',
				description: 'Return transactions since this date',
			},
			{
				displayName: 'Until Date',
				name: 'untilDate',
				type: 'dateTime',
				default: '',
				description: 'Return transactions until this date',
			},
			{
				displayName: 'Kinds',
				name: 'filterKinds',
				type: 'multiOptions',
				options: [
					{ name: 'Baseline', value: 'baseline' },
					{ name: 'Trial', value: 'trial' },
					{ name: 'Initial', value: 'initial' },
					{ name: 'One Time', value: 'one_time' },
					{ name: 'Metered', value: 'metered' },
					{ name: 'Metered Component', value: 'metered_component' },
					{ name: 'Quantity Based Component', value: 'quantity_based_component' },
					{ name: 'On Off Component', value: 'on_off_component' },
					{ name: 'Tax', value: 'tax' },
					{ name: 'Coupon', value: 'coupon' },
					{ name: 'Refund', value: 'refund' },
					{ name: 'Credit', value: 'credit' },
				],
				default: [],
				description: 'Filter by transaction kinds',
			},
		],
	},

	// ----------------------------------
	//         transaction:refund
	// ----------------------------------
	{
		displayName: 'Amount (Cents)',
		name: 'amountInCents',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['refund'],
			},
		},
		description: 'Refund amount in cents',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['refund'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Memo or reason for the refund',
			},
			{
				displayName: 'External',
				name: 'external',
				type: 'boolean',
				default: false,
				description: 'Whether this is an external refund (not through gateway)',
			},
		],
	},
];
