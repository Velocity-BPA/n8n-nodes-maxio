/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const siteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['site'],
			},
		},
		options: [
			{
				name: 'Clear Data',
				value: 'clearData',
				description: 'Clear test/sandbox data',
				action: 'Clear site data',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get site details',
				action: 'Get site details',
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				description: 'Get site statistics',
				action: 'Get site statistics',
			},
		],
		default: 'get',
	},
];

export const siteFields: INodeProperties[] = [
	// ----------------------------------
	//         site:clearData
	// ----------------------------------
	{
		displayName: 'Cleanup Scope',
		name: 'cleanupScope',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Customers', value: 'customers' },
		],
		required: true,
		default: 'all',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['clearData'],
			},
		},
		description: 'What data to clear',
	},
	{
		displayName: 'Confirm Clear Data',
		name: 'confirmClearData',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['clearData'],
			},
		},
		description: 'Confirm that you want to clear all data (this action cannot be undone)',
	},
];
