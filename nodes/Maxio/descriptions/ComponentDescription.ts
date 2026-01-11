/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const componentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['component'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a component',
				action: 'Archive a component',
			},
			{
				name: 'Archive Price Point',
				value: 'archivePricePoint',
				description: 'Archive a price point',
				action: 'Archive a price point',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new component',
				action: 'Create a component',
			},
			{
				name: 'Create Allocation',
				value: 'createAllocation',
				description: 'Create or update component allocation',
				action: 'Create component allocation',
			},
			{
				name: 'Create Price Point',
				value: 'createPricePoint',
				description: 'Create a new price point',
				action: 'Create a price point',
			},
			{
				name: 'Create Usage',
				value: 'createUsage',
				description: 'Record component usage',
				action: 'Create usage record',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a component by ID',
				action: 'Get a component',
			},
			{
				name: 'Get Allocations',
				value: 'getAllocations',
				description: 'Get allocations for a component',
				action: 'Get component allocations',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many components',
				action: 'Get many components',
			},
			{
				name: 'Get Price Points',
				value: 'getAllPricePoints',
				description: 'Get all price points for a component',
				action: 'Get component price points',
			},
			{
				name: 'List Usages',
				value: 'listUsages',
				description: 'List usage records for a component',
				action: 'List usage records',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a component',
				action: 'Update a component',
			},
			{
				name: 'Update Price Point',
				value: 'updatePricePoint',
				description: 'Update a price point',
				action: 'Update a price point',
			},
		],
		default: 'get',
	},
];

export const componentFields: INodeProperties[] = [
	// ----------------------------------
	//         component:get
	// ----------------------------------
	{
		displayName: 'Product Family ID',
		name: 'productFamilyId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['get', 'getAll', 'create', 'update', 'archive', 'getAllPricePoints', 'createPricePoint', 'updatePricePoint', 'archivePricePoint'],
			},
		},
		description: 'The product family ID',
	},
	{
		displayName: 'Component ID',
		name: 'componentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['get', 'update', 'archive', 'getAllPricePoints', 'createPricePoint', 'updatePricePoint', 'archivePricePoint'],
			},
		},
		description: 'The component ID',
	},

	// ----------------------------------
	//         component:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['getAll', 'getAllocations', 'getAllPricePoints', 'listUsages'],
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
				resource: ['component'],
				operation: ['getAll', 'getAllocations', 'getAllPricePoints', 'listUsages'],
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
				resource: ['component'],
				operation: ['getAll'],
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
				displayName: 'Kind',
				name: 'filterKind',
				type: 'options',
				options: [
					{ name: 'Quantity Based', value: 'quantity_based_component' },
					{ name: 'Metered', value: 'metered_component' },
					{ name: 'On/Off', value: 'on_off_component' },
					{ name: 'Prepaid Usage', value: 'prepaid_usage_component' },
					{ name: 'Event Based', value: 'event_based_component' },
				],
				default: 'quantity_based_component',
				description: 'Filter by component kind',
			},
		],
	},

	// ----------------------------------
	//         component:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
			},
		},
		description: 'Component name',
	},
	{
		displayName: 'Kind',
		name: 'kind',
		type: 'options',
		options: [
			{ name: 'Quantity Based', value: 'quantity_based_component' },
			{ name: 'Metered', value: 'metered_component' },
			{ name: 'On/Off', value: 'on_off_component' },
			{ name: 'Prepaid Usage', value: 'prepaid_usage_component' },
			{ name: 'Event Based', value: 'event_based_component' },
		],
		required: true,
		default: 'quantity_based_component',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
			},
		},
		description: 'Type of component',
	},
	{
		displayName: 'Unit Name',
		name: 'unitName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
			},
		},
		description: 'Display name for the unit (e.g., "seat", "GB", "message")',
	},
	{
		displayName: 'Pricing Scheme',
		name: 'pricingScheme',
		type: 'options',
		options: [
			{ name: 'Per Unit', value: 'per_unit' },
			{ name: 'Tiered', value: 'tiered' },
			{ name: 'Volume', value: 'volume' },
			{ name: 'Stairstep', value: 'stairstep' },
		],
		required: true,
		default: 'per_unit',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
			},
		},
		description: 'Pricing scheme for the component',
	},
	{
		displayName: 'Unit Price',
		name: 'unitPrice',
		type: 'string',
		default: '0.00',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
				pricingScheme: ['per_unit'],
			},
		},
		description: 'Price per unit (e.g., "1.50")',
	},
	{
		displayName: 'Prices',
		name: 'prices',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
				pricingScheme: ['tiered', 'volume', 'stairstep'],
			},
		},
		options: [
			{
				displayName: 'Price Tier',
				name: 'priceTiers',
				values: [
					{
						displayName: 'Starting Quantity',
						name: 'startingQuantity',
						type: 'number',
						default: 0,
						description: 'Tier starting quantity',
					},
					{
						displayName: 'Ending Quantity',
						name: 'endingQuantity',
						type: 'number',
						default: 0,
						description: 'Tier ending quantity (use 0 for unlimited)',
					},
					{
						displayName: 'Unit Price',
						name: 'unitPrice',
						type: 'string',
						default: '0.00',
						description: 'Price per unit for this tier',
					},
				],
			},
		],
		description: 'Tiered pricing configuration',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['create'],
			},
		},
		options: [
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
				description: 'Component description',
			},
			{
				displayName: 'Taxable',
				name: 'taxable',
				type: 'boolean',
				default: false,
				description: 'Whether the component is subject to tax',
			},
			{
				displayName: 'Tax Code',
				name: 'taxCode',
				type: 'string',
				default: '',
				description: 'Avalara tax code',
			},
			{
				displayName: 'Recurring',
				name: 'recurring',
				type: 'boolean',
				default: true,
				description: 'Whether the component is billed each period',
			},
			{
				displayName: 'Upgrade Charge',
				name: 'upgradeCharge',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Prorated', value: 'prorated' },
					{ name: 'Full', value: 'full' },
				],
				default: 'prorated',
				description: 'Charge behavior on upgrade',
			},
			{
				displayName: 'Downgrade Credit',
				name: 'downgradeCredit',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Prorated', value: 'prorated' },
					{ name: 'Full', value: 'full' },
				],
				default: 'none',
				description: 'Credit behavior on downgrade',
			},
			{
				displayName: 'Allow Fractional Quantities',
				name: 'allowFractionalQuantities',
				type: 'boolean',
				default: false,
				description: 'Whether to allow decimal quantities',
			},
			{
				displayName: 'Accounting Code',
				name: 'accountingCode',
				type: 'string',
				default: '',
				description: 'Accounting code for external systems',
			},
		],
	},

	// ----------------------------------
	//         component:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Component name',
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
				description: 'Component description',
			},
			{
				displayName: 'Taxable',
				name: 'taxable',
				type: 'boolean',
				default: false,
				description: 'Whether the component is subject to tax',
			},
			{
				displayName: 'Tax Code',
				name: 'taxCode',
				type: 'string',
				default: '',
				description: 'Avalara tax code',
			},
			{
				displayName: 'Accounting Code',
				name: 'accountingCode',
				type: 'string',
				default: '',
				description: 'Accounting code for external systems',
			},
		],
	},

	// ----------------------------------
	//         component:createAllocation
	// ----------------------------------
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createAllocation', 'getAllocations', 'createUsage', 'listUsages'],
			},
		},
		description: 'The subscription ID',
	},
	{
		displayName: 'Component ID',
		name: 'componentIdForAllocation',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createAllocation', 'getAllocations', 'createUsage', 'listUsages'],
			},
		},
		description: 'The component ID',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createAllocation'],
			},
		},
		description: 'The quantity to allocate',
	},
	{
		displayName: 'Allocation Options',
		name: 'allocationOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createAllocation'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Note about the allocation',
			},
			{
				displayName: 'Proration Upgrade Scheme',
				name: 'prorationUpgradeScheme',
				type: 'options',
				options: [
					{ name: 'Prorate Attempt Capture', value: 'prorate-attempt-capture' },
					{ name: 'Prorate Delay Capture', value: 'prorate-delay-capture' },
					{ name: 'No Prorate', value: 'no-prorate' },
				],
				default: 'prorate-attempt-capture',
				description: 'How to handle upgrades',
			},
			{
				displayName: 'Proration Downgrade Scheme',
				name: 'prorationDowngradeScheme',
				type: 'options',
				options: [
					{ name: 'Prorate', value: 'prorate' },
					{ name: 'No Prorate', value: 'no-prorate' },
				],
				default: 'no-prorate',
				description: 'How to handle downgrades',
			},
			{
				displayName: 'Accrue Charge',
				name: 'accrueCharge',
				type: 'boolean',
				default: false,
				description: 'Whether to accrue the charge',
			},
			{
				displayName: 'Price Point ID',
				name: 'pricePointId',
				type: 'number',
				default: 0,
				description: 'Price point to use for this allocation',
			},
		],
	},

	// ----------------------------------
	//         component:createUsage
	// ----------------------------------
	{
		displayName: 'Quantity',
		name: 'usageQuantity',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createUsage'],
			},
		},
		description: 'The usage quantity to record',
	},
	{
		displayName: 'Usage Options',
		name: 'usageOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createUsage'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Note about the usage',
			},
			{
				displayName: 'Price Point ID',
				name: 'pricePointId',
				type: 'number',
				default: 0,
				description: 'Price point to use for this usage',
			},
		],
	},

	// ----------------------------------
	//         component:createPricePoint
	// ----------------------------------
	{
		displayName: 'Price Point Name',
		name: 'pricePointName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createPricePoint'],
			},
		},
		description: 'Name for the price point',
	},
	{
		displayName: 'Pricing Scheme',
		name: 'pricePointPricingScheme',
		type: 'options',
		options: [
			{ name: 'Per Unit', value: 'per_unit' },
			{ name: 'Tiered', value: 'tiered' },
			{ name: 'Volume', value: 'volume' },
			{ name: 'Stairstep', value: 'stairstep' },
		],
		required: true,
		default: 'per_unit',
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createPricePoint'],
			},
		},
		description: 'Pricing scheme for the price point',
	},
	{
		displayName: 'Prices',
		name: 'pricePointPrices',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['createPricePoint'],
			},
		},
		options: [
			{
				displayName: 'Price Tier',
				name: 'priceTiers',
				values: [
					{
						displayName: 'Starting Quantity',
						name: 'startingQuantity',
						type: 'number',
						default: 0,
						description: 'Tier starting quantity',
					},
					{
						displayName: 'Ending Quantity',
						name: 'endingQuantity',
						type: 'number',
						default: 0,
						description: 'Tier ending quantity',
					},
					{
						displayName: 'Unit Price',
						name: 'unitPrice',
						type: 'string',
						default: '0.00',
						description: 'Price per unit',
					},
				],
			},
		],
		description: 'Price tiers for the price point',
	},

	// ----------------------------------
	//         component:updatePricePoint
	// ----------------------------------
	{
		displayName: 'Price Point ID',
		name: 'pricePointId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['updatePricePoint', 'archivePricePoint'],
			},
		},
		description: 'The price point ID',
	},
	{
		displayName: 'Update Fields',
		name: 'pricePointUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['component'],
				operation: ['updatePricePoint'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Price point name',
			},
			{
				displayName: 'Handle',
				name: 'handle',
				type: 'string',
				default: '',
				description: 'URL-friendly identifier',
			},
		],
	},
];
