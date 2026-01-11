/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
			},
		},
		options: [
			{
				name: 'Apply Credit',
				value: 'applyCredit',
				description: 'Apply credit note to an invoice',
				action: 'Apply credit to invoice',
			},
			{
				name: 'Apply Payment',
				value: 'applyPayment',
				description: 'Apply payment to an invoice',
				action: 'Apply payment to invoice',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create an ad-hoc invoice',
				action: 'Create an invoice',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an invoice by ID or UID',
				action: 'Get an invoice',
			},
			{
				name: 'Get Credit Notes',
				value: 'getCreditNotes',
				description: 'Get credit notes for an invoice',
				action: 'Get invoice credit notes',
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				description: 'Get events for an invoice',
				action: 'Get invoice events',
			},
			{
				name: 'Get Line Items',
				value: 'getLineItems',
				description: 'Get line items for an invoice',
				action: 'Get invoice line items',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many invoices',
				action: 'Get many invoices',
			},
			{
				name: 'Issue Advance Invoice',
				value: 'issueAdvanceInvoice',
				description: 'Issue an invoice in advance',
				action: 'Issue advance invoice',
			},
			{
				name: 'Record Payment',
				value: 'recordPayment',
				description: 'Record an external payment',
				action: 'Record invoice payment',
			},
			{
				name: 'Refund',
				value: 'refund',
				description: 'Refund an invoice',
				action: 'Refund an invoice',
			},
			{
				name: 'Send Email',
				value: 'sendEmail',
				description: 'Send invoice via email',
				action: 'Send invoice email',
			},
			{
				name: 'Void',
				value: 'void',
				description: 'Void an invoice',
				action: 'Void an invoice',
			},
		],
		default: 'get',
	},
];

export const invoiceFields: INodeProperties[] = [
	// ----------------------------------
	//         invoice:get
	// ----------------------------------
	{
		displayName: 'Invoice Identifier',
		name: 'invoiceIdentifier',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['get', 'void', 'refund', 'recordPayment', 'applyPayment', 'applyCredit', 'sendEmail', 'getEvents', 'getLineItems', 'getCreditNotes'],
			},
		},
		description: 'The invoice ID (number) or UID (string)',
	},

	// ----------------------------------
	//         invoice:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getAll', 'getEvents', 'getLineItems', 'getCreditNotes'],
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
				resource: ['invoice'],
				operation: ['getAll', 'getEvents', 'getLineItems', 'getCreditNotes'],
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
				resource: ['invoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Draft', value: 'draft' },
					{ name: 'Open', value: 'open' },
					{ name: 'Paid', value: 'paid' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Voided', value: 'voided' },
					{ name: 'Canceled', value: 'canceled' },
				],
				default: 'open',
				description: 'Filter by invoice status',
			},
			{
				displayName: 'Subscription ID',
				name: 'subscriptionId',
				type: 'number',
				default: 0,
				description: 'Filter by subscription',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'number',
				default: 0,
				description: 'Filter by customer',
			},
			{
				displayName: 'Date Field',
				name: 'dateField',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Due Date', value: 'due_date' },
					{ name: 'Issue Date', value: 'issue_date' },
					{ name: 'Updated At', value: 'updated_at' },
					{ name: 'Paid Date', value: 'paid_date' },
				],
				default: 'created_at',
				description: 'Date field to filter by',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter invoices on or after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter invoices on or before this date',
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
				displayName: 'Include Line Items',
				name: 'lineItems',
				type: 'boolean',
				default: false,
				description: 'Whether to include line items in response',
			},
			{
				displayName: 'Include Discounts',
				name: 'discounts',
				type: 'boolean',
				default: false,
				description: 'Whether to include discounts in response',
			},
			{
				displayName: 'Include Taxes',
				name: 'taxes',
				type: 'boolean',
				default: false,
				description: 'Whether to include taxes in response',
			},
			{
				displayName: 'Include Credits',
				name: 'credits',
				type: 'boolean',
				default: false,
				description: 'Whether to include credits in response',
			},
			{
				displayName: 'Include Payments',
				name: 'payments',
				type: 'boolean',
				default: false,
				description: 'Whether to include payments in response',
			},
			{
				displayName: 'Include Refunds',
				name: 'refunds',
				type: 'boolean',
				default: false,
				description: 'Whether to include refunds in response',
			},
		],
	},

	// ----------------------------------
	//         invoice:create
	// ----------------------------------
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create', 'issueAdvanceInvoice'],
			},
		},
		description: 'The subscription to invoice',
	},
	{
		displayName: 'Line Items',
		name: 'lineItems',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Item',
				name: 'items',
				values: [
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Line item title',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'string',
						default: '1',
						description: 'Quantity of the item',
					},
					{
						displayName: 'Unit Price',
						name: 'unitPrice',
						type: 'string',
						default: '0.00',
						description: 'Price per unit',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Item description',
					},
					{
						displayName: 'Taxable',
						name: 'taxable',
						type: 'boolean',
						default: false,
						description: 'Whether the item is taxable',
					},
				],
			},
		],
		description: 'Line items for the invoice',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Issue Date',
				name: 'issueDate',
				type: 'dateTime',
				default: '',
				description: 'Date to issue the invoice',
			},
			{
				displayName: 'Net Terms',
				name: 'netTerms',
				type: 'number',
				default: 0,
				description: 'Number of days until payment is due',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Memo to include on the invoice',
			},
			{
				displayName: 'Payment Instructions',
				name: 'paymentInstructions',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Payment instructions for the customer',
			},
		],
	},

	// ----------------------------------
	//         invoice:void
	// ----------------------------------
	{
		displayName: 'Void Reason',
		name: 'voidReason',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['void'],
			},
		},
		description: 'Reason for voiding the invoice',
	},

	// ----------------------------------
	//         invoice:refund
	// ----------------------------------
	{
		displayName: 'Refund Amount',
		name: 'refundAmount',
		type: 'string',
		required: true,
		default: '0.00',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['refund'],
			},
		},
		description: 'Amount to refund (e.g., "10.00")',
	},
	{
		displayName: 'Refund Options',
		name: 'refundOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['refund'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Memo for the refund',
			},
			{
				displayName: 'Apply Credit',
				name: 'applyCredit',
				type: 'boolean',
				default: false,
				description: 'Whether to apply as credit instead of refund',
			},
			{
				displayName: 'External',
				name: 'external',
				type: 'boolean',
				default: false,
				description: 'Whether this is an external refund',
			},
		],
	},

	// ----------------------------------
	//         invoice:recordPayment
	// ----------------------------------
	{
		displayName: 'Amount',
		name: 'paymentAmount',
		type: 'string',
		required: true,
		default: '0.00',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['recordPayment'],
			},
		},
		description: 'Payment amount (e.g., "100.00")',
	},
	{
		displayName: 'Payment Method',
		name: 'paymentMethod',
		type: 'options',
		options: [
			{ name: 'Check', value: 'check' },
			{ name: 'Cash', value: 'cash' },
			{ name: 'Money Order', value: 'money_order' },
			{ name: 'ACH', value: 'ach' },
			{ name: 'Credit Card', value: 'credit_card' },
			{ name: 'PayPal', value: 'paypal_account' },
			{ name: 'Other', value: 'other' },
		],
		required: true,
		default: 'other',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['recordPayment'],
			},
		},
		description: 'Method of payment',
	},
	{
		displayName: 'Payment Options',
		name: 'paymentOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['recordPayment'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Memo for the payment',
			},
			{
				displayName: 'Details',
				name: 'details',
				type: 'string',
				default: '',
				description: 'Additional payment details',
			},
		],
	},

	// ----------------------------------
	//         invoice:applyPayment
	// ----------------------------------
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['applyPayment'],
			},
		},
		description: 'The payment ID to apply',
	},
	{
		displayName: 'Amount',
		name: 'applyAmount',
		type: 'string',
		required: true,
		default: '0.00',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['applyPayment'],
			},
		},
		description: 'Amount to apply from the payment',
	},

	// ----------------------------------
	//         invoice:applyCredit
	// ----------------------------------
	{
		displayName: 'Credit Note UID',
		name: 'creditNoteUid',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['applyCredit'],
			},
		},
		description: 'The credit note UID to apply',
	},
	{
		displayName: 'Amount',
		name: 'creditAmount',
		type: 'string',
		required: true,
		default: '0.00',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['applyCredit'],
			},
		},
		description: 'Amount to apply from the credit note',
	},

	// ----------------------------------
	//         invoice:sendEmail
	// ----------------------------------
	{
		displayName: 'Email Options',
		name: 'emailOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['sendEmail'],
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
				displayName: 'BCC Emails',
				name: 'bccEmails',
				type: 'string',
				default: '',
				description: 'Comma-separated list of BCC email addresses',
			},
		],
	},
];
