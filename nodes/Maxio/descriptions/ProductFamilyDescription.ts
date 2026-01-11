/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const productFamilyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['productFamily'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a product family',
				action: 'Create a product family',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a product family by ID',
				action: 'Get a product family',
			},
			{
				name: 'Get Components',
				value: 'getComponents',
				description: 'Get components in a product family',
				action: 'Get product family components',
			},
			{
				name: 'Get Coupons',
				value: 'getCoupons',
				description: 'Get coupons in a product family',
				action: 'Get product family coupons',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many product families',
				action: 'Get many product families',
			},
			{
				name: 'Get Products',
				value: 'getProducts',
				description: 'Get products in a product family',
				action: 'Get product family products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a product family',
				action: 'Update a product family',
			},
		],
		default: 'get',
	},
];

export const productFamilyFields: INodeProperties[] = [
	// ----------------------------------
	//         productFamily:get
	// ----------------------------------
	{
		displayName: 'Product Family ID',
		name: 'productFamilyId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['get', 'update', 'getProducts', 'getComponents', 'getCoupons'],
			},
		},
		description: 'The product family ID',
	},

	// ----------------------------------
	//         productFamily:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['getAll', 'getProducts', 'getComponents', 'getCoupons'],
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
				resource: ['productFamily'],
				operation: ['getAll', 'getProducts', 'getComponents', 'getCoupons'],
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
				resource: ['productFamily'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Date Field',
				name: 'dateField',
				type: 'options',
				options: [
					{ name: 'Updated At', value: 'updated_at' },
					{ name: 'Created At', value: 'created_at' },
				],
				default: 'updated_at',
				description: 'Field to use for date filtering',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter by end date',
			},
			{
				displayName: 'End Datetime',
				name: 'endDatetime',
				type: 'dateTime',
				default: '',
				description: 'Filter by end datetime',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter by start date',
			},
			{
				displayName: 'Start Datetime',
				name: 'startDatetime',
				type: 'dateTime',
				default: '',
				description: 'Filter by start datetime',
			},
		],
	},

	// ----------------------------------
	//         productFamily:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['create'],
			},
		},
		description: 'The product family name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Handle',
				name: 'handle',
				type: 'string',
				default: '',
				description: 'URL-friendly handle (auto-generated if not provided)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Product family description',
			},
			{
				displayName: 'Accounting Code',
				name: 'accountingCode',
				type: 'string',
				default: '',
				description: 'Accounting code for the product family',
			},
		],
	},

	// ----------------------------------
	//         productFamily:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The product family name',
			},
			{
				displayName: 'Handle',
				name: 'handle',
				type: 'string',
				default: '',
				description: 'URL-friendly handle',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Product family description',
			},
			{
				displayName: 'Accounting Code',
				name: 'accountingCode',
				type: 'string',
				default: '',
				description: 'Accounting code for the product family',
			},
		],
	},

	// ----------------------------------
	//         productFamily:getProducts filters
	// ----------------------------------
	{
		displayName: 'Products Filters',
		name: 'productsFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['getProducts'],
			},
		},
		options: [
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
					{ name: 'Updated At', value: 'updated_at' },
					{ name: 'Created At', value: 'created_at' },
				],
				default: 'updated_at',
				description: 'Field to use for date filtering',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter by end date',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter by start date',
			},
		],
	},

	// ----------------------------------
	//         productFamily:getComponents filters
	// ----------------------------------
	{
		displayName: 'Components Filters',
		name: 'componentsFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['getComponents'],
			},
		},
		options: [
			{
				displayName: 'Include Archived',
				name: 'includeArchived',
				type: 'boolean',
				default: false,
				description: 'Whether to include archived components',
			},
			{
				displayName: 'Filter IDs',
				name: 'filterIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of component IDs to filter',
			},
		],
	},

	// ----------------------------------
	//         productFamily:getCoupons filters
	// ----------------------------------
	{
		displayName: 'Coupons Filters',
		name: 'couponsFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['productFamily'],
				operation: ['getCoupons'],
			},
		},
		options: [
			{
				displayName: 'Currency Prices',
				name: 'currencyPrices',
				type: 'boolean',
				default: false,
				description: 'Whether to include currency prices',
			},
			{
				displayName: 'Filter IDs',
				name: 'filterIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of coupon IDs to filter',
			},
			{
				displayName: 'Filter Codes',
				name: 'filterCodes',
				type: 'string',
				default: '',
				description: 'Comma-separated list of coupon codes to filter',
			},
			{
				displayName: 'Filter Use Site Exchange Rate',
				name: 'filterUseSiteExchangeRate',
				type: 'boolean',
				default: false,
				description: 'Whether to use site exchange rate for currency conversion',
			},
		],
	},
];
