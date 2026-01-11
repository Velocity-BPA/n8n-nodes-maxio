/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const paymentProfileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a payment profile',
				action: 'Create a payment profile',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a payment profile',
				action: 'Delete a payment profile',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payment profile by ID',
				action: 'Get a payment profile',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many payment profiles',
				action: 'Get many payment profiles',
			},
			{
				name: 'Set Default',
				value: 'setDefault',
				description: 'Set as default payment method',
				action: 'Set default payment profile',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a payment profile',
				action: 'Update a payment profile',
			},
		],
		default: 'get',
	},
];

export const paymentProfileFields: INodeProperties[] = [
	// ----------------------------------
	//         paymentProfile:get
	// ----------------------------------
	{
		displayName: 'Payment Profile ID',
		name: 'paymentProfileId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['get', 'update', 'delete', 'setDefault'],
			},
		},
		description: 'The payment profile ID',
	},

	// ----------------------------------
	//         paymentProfile:getAll
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['getAll', 'create'],
			},
		},
		description: 'The customer ID',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
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
				resource: ['paymentProfile'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         paymentProfile:create
	// ----------------------------------
	{
		displayName: 'Payment Type',
		name: 'paymentType',
		type: 'options',
		options: [
			{ name: 'Credit Card', value: 'credit_card' },
			{ name: 'Bank Account (ACH)', value: 'bank_account' },
		],
		required: true,
		default: 'credit_card',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
			},
		},
		description: 'Type of payment method',
	},
	// Credit Card Fields
	{
		displayName: 'Card Number',
		name: 'fullNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['credit_card'],
			},
		},
		description: 'Full credit card number',
	},
	{
		displayName: 'Expiration Month',
		name: 'expirationMonth',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 12,
		},
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['credit_card'],
			},
		},
		description: 'Card expiration month (1-12)',
	},
	{
		displayName: 'Expiration Year',
		name: 'expirationYear',
		type: 'number',
		required: true,
		default: 2025,
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['credit_card'],
			},
		},
		description: 'Card expiration year (4-digit)',
	},
	{
		displayName: 'CVV',
		name: 'cvv',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['credit_card'],
			},
		},
		description: 'Card verification value',
	},
	// Bank Account Fields
	{
		displayName: 'Bank Name',
		name: 'bankName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['bank_account'],
			},
		},
		description: 'Name of the bank',
	},
	{
		displayName: 'Routing Number',
		name: 'bankRoutingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['bank_account'],
			},
		},
		description: 'Bank routing number',
	},
	{
		displayName: 'Account Number',
		name: 'bankAccountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['bank_account'],
			},
		},
		description: 'Bank account number',
	},
	{
		displayName: 'Account Type',
		name: 'bankAccountType',
		type: 'options',
		options: [
			{ name: 'Checking', value: 'checking' },
			{ name: 'Savings', value: 'savings' },
		],
		required: true,
		default: 'checking',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['bank_account'],
			},
		},
		description: 'Type of bank account',
	},
	{
		displayName: 'Account Holder Type',
		name: 'bankAccountHolderType',
		type: 'options',
		options: [
			{ name: 'Personal', value: 'personal' },
			{ name: 'Business', value: 'business' },
		],
		required: true,
		default: 'personal',
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
				paymentType: ['bank_account'],
			},
		},
		description: 'Type of account holder',
	},
	// Common Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Cardholder or account holder first name',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Cardholder or account holder last name',
			},
			{
				displayName: 'Billing Address',
				name: 'billingAddress',
				type: 'string',
				default: '',
				description: 'Billing street address',
			},
			{
				displayName: 'Billing Address Line 2',
				name: 'billingAddress2',
				type: 'string',
				default: '',
				description: 'Additional billing address info',
			},
			{
				displayName: 'Billing City',
				name: 'billingCity',
				type: 'string',
				default: '',
				description: 'Billing city',
			},
			{
				displayName: 'Billing State',
				name: 'billingState',
				type: 'string',
				default: '',
				description: 'Billing state or province',
			},
			{
				displayName: 'Billing ZIP',
				name: 'billingZip',
				type: 'string',
				default: '',
				description: 'Billing ZIP or postal code',
			},
			{
				displayName: 'Billing Country',
				name: 'billingCountry',
				type: 'string',
				default: '',
				description: 'Billing country code',
			},
		],
	},

	// ----------------------------------
	//         paymentProfile:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentProfile'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Cardholder first name',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Cardholder last name',
			},
			{
				displayName: 'Expiration Month',
				name: 'expirationMonth',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 12,
				},
				default: 1,
				description: 'Card expiration month',
			},
			{
				displayName: 'Expiration Year',
				name: 'expirationYear',
				type: 'number',
				default: 2025,
				description: 'Card expiration year',
			},
			{
				displayName: 'Billing Address',
				name: 'billingAddress',
				type: 'string',
				default: '',
				description: 'Billing street address',
			},
			{
				displayName: 'Billing Address Line 2',
				name: 'billingAddress2',
				type: 'string',
				default: '',
				description: 'Additional billing address info',
			},
			{
				displayName: 'Billing City',
				name: 'billingCity',
				type: 'string',
				default: '',
				description: 'Billing city',
			},
			{
				displayName: 'Billing State',
				name: 'billingState',
				type: 'string',
				default: '',
				description: 'Billing state or province',
			},
			{
				displayName: 'Billing ZIP',
				name: 'billingZip',
				type: 'string',
				default: '',
				description: 'Billing ZIP or postal code',
			},
			{
				displayName: 'Billing Country',
				name: 'billingCountry',
				type: 'string',
				default: '',
				description: 'Billing country code',
			},
		],
	},
];
