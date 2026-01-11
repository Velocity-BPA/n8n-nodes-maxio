/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const couponOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a coupon',
				action: 'Archive a coupon',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new coupon',
				action: 'Create a coupon',
			},
			{
				name: 'Create Subcodes',
				value: 'createSubcodes',
				description: 'Generate coupon subcodes',
				action: 'Create coupon subcodes',
			},
			{
				name: 'Delete Subcode',
				value: 'deleteSubcode',
				description: 'Delete a coupon subcode',
				action: 'Delete a coupon subcode',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a coupon by ID or code',
				action: 'Get a coupon',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many coupons',
				action: 'Get many coupons',
			},
			{
				name: 'Get Subcodes',
				value: 'getSubcodes',
				description: 'Get subcodes for a coupon',
				action: 'Get coupon subcodes',
			},
			{
				name: 'Get Usages',
				value: 'getUsages',
				description: 'Get coupon usage statistics',
				action: 'Get coupon usages',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update coupon details',
				action: 'Update a coupon',
			},
		],
		default: 'get',
	},
];

export const couponFields: INodeProperties[] = [
	// ----------------------------------
	//         coupon:get
	// ----------------------------------
	{
		displayName: 'Product Family ID',
		name: 'productFamilyId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['get', 'getAll', 'create', 'update', 'archive', 'getSubcodes', 'createSubcodes', 'getUsages'],
			},
		},
		description: 'The product family ID',
	},
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['get', 'update', 'archive', 'getSubcodes', 'createSubcodes', 'getUsages'],
			},
		},
		description: 'The coupon ID',
	},

	// ----------------------------------
	//         coupon:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['getAll', 'getSubcodes', 'getUsages'],
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
				resource: ['coupon'],
				operation: ['getAll', 'getSubcodes', 'getUsages'],
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
				resource: ['coupon'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Currency Prices',
				name: 'currencyPrices',
				type: 'boolean',
				default: false,
				description: 'Whether to include currency prices in response',
			},
			{
				displayName: 'End Date',
				name: 'filterEndDate',
				type: 'dateTime',
				default: '',
				description: 'Filter coupons by end date',
			},
			{
				displayName: 'End Date (Range End)',
				name: 'filterEndDatetimeEnd',
				type: 'dateTime',
				default: '',
				description: 'End of date range filter',
			},
			{
				displayName: 'End Date (Range Start)',
				name: 'filterEndDatetimeStart',
				type: 'dateTime',
				default: '',
				description: 'Start of date range filter',
			},
			{
				displayName: 'IDs',
				name: 'filterIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of coupon IDs to filter',
			},
			{
				displayName: 'Codes',
				name: 'filterCodes',
				type: 'string',
				default: '',
				description: 'Comma-separated list of coupon codes to filter',
			},
			{
				displayName: 'Use Site Exchange Rate',
				name: 'filterUseSiteExchangeRate',
				type: 'boolean',
				default: false,
				description: 'Whether to use site exchange rate for currency conversion',
			},
		],
	},

	// ----------------------------------
	//         coupon:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		description: 'The coupon name',
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		description: 'The coupon code',
	},
	{
		displayName: 'Discount Type',
		name: 'discountType',
		type: 'options',
		options: [
			{ name: 'Percentage', value: 'percent' },
			{ name: 'Flat Amount', value: 'amount' },
		],
		required: true,
		default: 'percent',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		description: 'Type of discount',
	},
	{
		displayName: 'Percentage',
		name: 'percentage',
		type: 'number',
		typeOptions: {
			minValue: 0,
			maxValue: 100,
		},
		default: 10,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
				discountType: ['percent'],
			},
		},
		description: 'Percentage discount (0-100)',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amountInCents',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
				discountType: ['amount'],
			},
		},
		description: 'Flat discount amount in cents',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Coupon description',
			},
			{
				displayName: 'Allow Negative Balance',
				name: 'allowNegativeBalance',
				type: 'boolean',
				default: false,
				description: 'Whether to allow negative balance',
			},
			{
				displayName: 'Recurring',
				name: 'recurring',
				type: 'boolean',
				default: false,
				description: 'Whether coupon applies on renewal',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'options',
				options: [
					{ name: 'Forever', value: 'forever' },
					{ name: 'Once', value: 'once' },
					{ name: 'Number of Periods', value: 'duration' },
				],
				default: 'forever',
				description: 'How long the coupon lasts',
			},
			{
				displayName: 'Duration Period Count',
				name: 'durationPeriodCount',
				type: 'number',
				default: 1,
				description: 'Number of periods for duration type',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Coupon expiration date',
			},
			{
				displayName: 'Max Redemptions',
				name: 'maxRedemptions',
				type: 'number',
				default: 0,
				description: 'Maximum total redemptions (0 for unlimited)',
			},
			{
				displayName: 'Stackable',
				name: 'stackable',
				type: 'boolean',
				default: false,
				description: 'Whether coupon can stack with others',
			},
			{
				displayName: 'Compounding Strategy',
				name: 'compoundingStrategy',
				type: 'options',
				options: [
					{ name: 'Compound', value: 'compound' },
					{ name: 'Full Price', value: 'full_price' },
				],
				default: 'compound',
				description: 'How stacked coupons compound',
			},
			{
				displayName: 'Exclude Mid-Period Allocations',
				name: 'excludeMidPeriodAllocations',
				type: 'boolean',
				default: false,
				description: 'Whether to exclude mid-period allocations',
			},
			{
				displayName: 'Apply On Cancel at End of Period',
				name: 'applyOnCancelAtEndOfPeriod',
				type: 'boolean',
				default: false,
				description: 'Whether to apply when subscription cancels at period end',
			},
			{
				displayName: 'Apply On Subscription Expiration',
				name: 'applyOnSubscriptionExpiration',
				type: 'boolean',
				default: false,
				description: 'Whether to apply when subscription expires',
			},
			{
				displayName: 'Redemption Limit Per Subscription',
				name: 'redemptionLimitPerSubscription',
				type: 'number',
				default: 0,
				description: 'Max redemptions per subscription (0 for unlimited)',
			},
		],
	},

	// ----------------------------------
	//         coupon:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The coupon name',
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'The coupon code',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Coupon description',
			},
			{
				displayName: 'Percentage',
				name: 'percentage',
				type: 'number',
				default: 0,
				description: 'Percentage discount',
			},
			{
				displayName: 'Amount (Cents)',
				name: 'amountInCents',
				type: 'number',
				default: 0,
				description: 'Flat discount amount in cents',
			},
			{
				displayName: 'Allow Negative Balance',
				name: 'allowNegativeBalance',
				type: 'boolean',
				default: false,
				description: 'Whether to allow negative balance',
			},
			{
				displayName: 'Recurring',
				name: 'recurring',
				type: 'boolean',
				default: false,
				description: 'Whether coupon applies on renewal',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Coupon expiration date',
			},
			{
				displayName: 'Max Redemptions',
				name: 'maxRedemptions',
				type: 'number',
				default: 0,
				description: 'Maximum total redemptions',
			},
			{
				displayName: 'Stackable',
				name: 'stackable',
				type: 'boolean',
				default: false,
				description: 'Whether coupon can stack with others',
			},
		],
	},

	// ----------------------------------
	//         coupon:createSubcodes
	// ----------------------------------
	{
		displayName: 'Subcodes',
		name: 'subcodes',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['createSubcodes'],
			},
		},
		description: 'Comma-separated list of subcodes to create',
	},

	// ----------------------------------
	//         coupon:deleteSubcode
	// ----------------------------------
	{
		displayName: 'Subcode',
		name: 'subcode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['deleteSubcode'],
			},
		},
		description: 'The subcode to delete',
	},
];
