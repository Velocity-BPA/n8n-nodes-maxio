/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a product',
				action: 'Archive a product',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new product',
				action: 'Create a product',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a product by ID or handle',
				action: 'Get a product',
			},
			{
				name: 'Get Components',
				value: 'getComponents',
				description: 'Get components for a product',
				action: 'Get product components',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many products',
				action: 'Get many products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a product',
				action: 'Update a product',
			},
		],
		default: 'get',
	},
];

export const productFields: INodeProperties[] = [
	// ----------------------------------
	//         product:get
	// ----------------------------------
	{
		displayName: 'Product Identifier',
		name: 'productIdentifier',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get', 'update', 'archive', 'getComponents'],
			},
		},
		description: 'The product ID (number) or handle (string)',
	},

	// ----------------------------------
	//         product:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['product'],
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
				resource: ['product'],
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
				resource: ['product'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Product Family ID',
				name: 'productFamilyId',
				type: 'number',
				default: 0,
				description: 'Filter by product family',
			},
			{
				displayName: 'Include Archived',
				name: 'includeArchived',
				type: 'boolean',
				default: false,
				description: 'Whether to include archived products',
			},
			{
				displayName: 'Date Field',
				name: 'dateField',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Updated At', value: 'updated_at' },
				],
				default: 'created_at',
				description: 'Date field to filter by',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter products on or after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter products on or before this date',
			},
		],
	},

	// ----------------------------------
	//         product:create
	// ----------------------------------
	{
		displayName: 'Product Family ID',
		name: 'productFamilyId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'The product family to create this product in',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'Product name',
	},
	{
		displayName: 'Price (In Cents)',
		name: 'priceInCents',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'Product price in cents (e.g., 1000 for $10.00)',
	},
	{
		displayName: 'Interval',
		name: 'interval',
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'Number of billing interval units',
	},
	{
		displayName: 'Interval Unit',
		name: 'intervalUnit',
		type: 'options',
		options: [
			{ name: 'Month', value: 'month' },
			{ name: 'Day', value: 'day' },
		],
		required: true,
		default: 'month',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'Billing interval unit',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Handle',
				name: 'handle',
				type: 'string',
				default: '',
				description: 'URL-friendly identifier for the product',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Product description',
			},
			{
				displayName: 'Accounting Code',
				name: 'accountingCode',
				type: 'string',
				default: '',
				description: 'Accounting code for external systems',
			},
			{
				displayName: 'Initial Charge (In Cents)',
				name: 'initialChargeInCents',
				type: 'number',
				default: 0,
				description: 'One-time setup fee in cents',
			},
			{
				displayName: 'Trial Price (In Cents)',
				name: 'trialPriceInCents',
				type: 'number',
				default: 0,
				description: 'Trial period price in cents',
			},
			{
				displayName: 'Trial Interval',
				name: 'trialInterval',
				type: 'number',
				default: 0,
				description: 'Number of trial interval units',
			},
			{
				displayName: 'Trial Interval Unit',
				name: 'trialIntervalUnit',
				type: 'options',
				options: [
					{ name: 'Month', value: 'month' },
					{ name: 'Day', value: 'day' },
				],
				default: 'month',
				description: 'Trial interval unit',
			},
			{
				displayName: 'Trial Type',
				name: 'trialType',
				type: 'options',
				options: [
					{ name: 'No Obligation', value: 'no_obligation' },
					{ name: 'Payment Expected', value: 'payment_expected' },
				],
				default: 'no_obligation',
				description: 'Type of trial period',
			},
			{
				displayName: 'Expiration Interval',
				name: 'expirationInterval',
				type: 'number',
				default: 0,
				description: 'Number of expiration interval units',
			},
			{
				displayName: 'Expiration Interval Unit',
				name: 'expirationIntervalUnit',
				type: 'options',
				options: [
					{ name: 'Month', value: 'month' },
					{ name: 'Day', value: 'day' },
					{ name: 'Never', value: 'never' },
				],
				default: 'never',
				description: 'Expiration interval unit',
			},
			{
				displayName: 'Request Credit Card',
				name: 'requestCreditCard',
				type: 'boolean',
				default: true,
				description: 'Whether to request payment info at signup',
			},
			{
				displayName: 'Require Credit Card',
				name: 'requireCreditCard',
				type: 'boolean',
				default: true,
				description: 'Whether payment info is required',
			},
			{
				displayName: 'Taxable',
				name: 'taxable',
				type: 'boolean',
				default: false,
				description: 'Whether the product is subject to tax',
			},
			{
				displayName: 'Tax Code',
				name: 'taxCode',
				type: 'string',
				default: '',
				description: 'Avalara tax code',
			},
			{
				displayName: 'Return URL',
				name: 'returnUrl',
				type: 'string',
				default: '',
				description: 'URL to redirect after signup',
			},
			{
				displayName: 'Update Return URL',
				name: 'updateReturnUrl',
				type: 'string',
				default: '',
				description: 'URL to redirect after update',
			},
			{
				displayName: 'Auto Create Signup Page',
				name: 'autoCreateSignupPage',
				type: 'boolean',
				default: true,
				description: 'Whether to create a public signup page',
			},
		],
	},

	// ----------------------------------
	//         product:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Product name',
			},
			{
				displayName: 'Handle',
				name: 'handle',
				type: 'string',
				default: '',
				description: 'URL-friendly identifier',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Product description',
			},
			{
				displayName: 'Price (In Cents)',
				name: 'priceInCents',
				type: 'number',
				default: 0,
				description: 'Product price in cents',
			},
			{
				displayName: 'Accounting Code',
				name: 'accountingCode',
				type: 'string',
				default: '',
				description: 'Accounting code for external systems',
			},
			{
				displayName: 'Taxable',
				name: 'taxable',
				type: 'boolean',
				default: false,
				description: 'Whether the product is subject to tax',
			},
			{
				displayName: 'Tax Code',
				name: 'taxCode',
				type: 'string',
				default: '',
				description: 'Avalara tax code',
			},
			{
				displayName: 'Return URL',
				name: 'returnUrl',
				type: 'string',
				default: '',
				description: 'URL to redirect after signup',
			},
			{
				displayName: 'Update Return URL',
				name: 'updateReturnUrl',
				type: 'string',
				default: '',
				description: 'URL to redirect after update',
			},
		],
	},

	// ----------------------------------
	//         product:getComponents
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getComponents'],
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
				resource: ['product'],
				operation: ['getComponents'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
