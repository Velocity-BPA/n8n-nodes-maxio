/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const statementOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statement'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a statement by ID',
				action: 'Get a statement',
			},
			{
				name: 'Get IDs',
				value: 'getIds',
				description: 'Get statement IDs in a date range',
				action: 'Get statement IDs',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many statements for a subscription',
				action: 'Get many statements',
			},
		],
		default: 'get',
	},
];

export const statementFields: INodeProperties[] = [
	// ----------------------------------
	//         statement:get
	// ----------------------------------
	{
		displayName: 'Statement ID',
		name: 'statementId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['get'],
			},
		},
		description: 'The statement ID',
	},

	// ----------------------------------
	//         statement:getAll
	// ----------------------------------
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['getAll', 'getIds'],
			},
		},
		description: 'The subscription ID',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['statement'],
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
				resource: ['statement'],
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
				resource: ['statement'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At (Ascending)', value: 'created_at' },
					{ name: 'Created At (Descending)', value: '-created_at' },
					{ name: 'Opened At (Ascending)', value: 'opened_at' },
					{ name: 'Opened At (Descending)', value: '-opened_at' },
					{ name: 'Settled At (Ascending)', value: 'settled_at' },
					{ name: 'Settled At (Descending)', value: '-settled_at' },
				],
				default: '-created_at',
				description: 'Sort order for statements',
			},
		],
	},

	// ----------------------------------
	//         statement:getIds
	// ----------------------------------
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['getIds'],
			},
		},
		description: 'Start date for the date range',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['getIds'],
			},
		},
		description: 'End date for the date range',
	},
];
