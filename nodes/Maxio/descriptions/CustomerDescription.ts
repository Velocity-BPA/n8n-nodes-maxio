/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer',
				action: 'Create a customer',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a customer',
				action: 'Delete a customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer by ID',
				action: 'Get a customer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many customers',
				action: 'Get many customers',
			},
			{
				name: 'Get Metadata',
				value: 'getMetadata',
				description: 'Get customer metadata',
				action: 'Get customer metadata',
			},
			{
				name: 'Get Payment Profiles',
				value: 'getPaymentProfiles',
				description: 'Get payment profiles for a customer',
				action: 'Get customer payment profiles',
			},
			{
				name: 'Get Subscriptions',
				value: 'getSubscriptions',
				description: 'Get subscriptions for a customer',
				action: 'Get customer subscriptions',
			},
			{
				name: 'Set Metadata',
				value: 'setMetadata',
				description: 'Set customer metadata',
				action: 'Set customer metadata',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
				action: 'Update a customer',
			},
		],
		default: 'get',
	},
];

export const customerFields: INodeProperties[] = [
	// ----------------------------------
	//         customer:get
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: [
					'get',
					'update',
					'delete',
					'getSubscriptions',
					'getPaymentProfiles',
					'getMetadata',
					'setMetadata',
				],
			},
		},
		description: 'The ID of the customer',
	},

	// ----------------------------------
	//         customer:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search Query',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search customers by name, email, or reference',
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
				description: 'The type of date field to filter by',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter customers with a date on or after this value',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter customers with a date on or before this value',
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
		],
	},

	// ----------------------------------
	//         customer:create
	// ----------------------------------
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'Customer first name',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'Customer last name',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'Customer email address',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'CC Emails',
				name: 'ccEmails',
				type: 'string',
				default: '',
				description: 'Comma-separated list of CC email addresses',
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
				description: 'External reference ID',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number',
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
			{
				displayName: 'Tax Exempt',
				name: 'taxExempt',
				type: 'boolean',
				default: false,
				description: 'Whether the customer is tax exempt',
			},
			{
				displayName: 'VAT Number',
				name: 'vatNumber',
				type: 'string',
				default: '',
				description: 'VAT registration number',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Customer locale (e.g., en-US)',
			},
			{
				displayName: 'Parent ID',
				name: 'parentId',
				type: 'number',
				default: 0,
				description: 'Parent customer ID for hierarchical relationships',
			},
		],
	},

	// ----------------------------------
	//         customer:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
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
				displayName: 'CC Emails',
				name: 'ccEmails',
				type: 'string',
				default: '',
				description: 'Comma-separated list of CC email addresses',
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
				description: 'External reference ID',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number',
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
			{
				displayName: 'Tax Exempt',
				name: 'taxExempt',
				type: 'boolean',
				default: false,
				description: 'Whether the customer is tax exempt',
			},
			{
				displayName: 'VAT Number',
				name: 'vatNumber',
				type: 'string',
				default: '',
				description: 'VAT registration number',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Customer locale (e.g., en-US)',
			},
			{
				displayName: 'Parent ID',
				name: 'parentId',
				type: 'number',
				default: 0,
				description: 'Parent customer ID for hierarchical relationships',
			},
		],
	},

	// ----------------------------------
	//         customer:setMetadata
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
				resource: ['customer'],
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
		description: 'Metadata to set on the customer',
	},

	// ----------------------------------
	//         customer:getSubscriptions
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getSubscriptions', 'getPaymentProfiles'],
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
				resource: ['customer'],
				operation: ['getSubscriptions', 'getPaymentProfiles'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
