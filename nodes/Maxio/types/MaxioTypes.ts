/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

// Subscription Types
export interface ISubscription extends IDataObject {
	id?: number;
	state?: string;
	balance_in_cents?: number;
	total_revenue_in_cents?: number;
	product_price_in_cents?: number;
	product_version_number?: number;
	current_period_ends_at?: string;
	next_assessment_at?: string;
	trial_started_at?: string;
	trial_ended_at?: string;
	activated_at?: string;
	expires_at?: string;
	created_at?: string;
	updated_at?: string;
	cancellation_message?: string;
	cancellation_method?: string;
	cancel_at_end_of_period?: boolean;
	canceled_at?: string;
	current_period_started_at?: string;
	previous_state?: string;
	signup_payment_id?: number;
	signup_revenue?: string;
	delayed_cancel_at?: string;
	coupon_code?: string;
	snap_day?: string | number;
	payment_collection_method?: string;
	customer?: ICustomer;
	product?: IProduct;
	credit_card?: IPaymentProfile;
	group?: IDataObject;
	bank_account?: IDataObject;
	payment_type?: string;
	referral_code?: string;
	next_product_id?: number;
	next_product_handle?: string;
	coupon_use_count?: number;
	coupon_uses_allowed?: number;
	reason_code?: string;
	automatically_resume_at?: string;
	coupon_codes?: string[];
	offer_id?: number;
	payer_id?: number;
	current_billing_amount_in_cents?: number;
	product_price_point_id?: number;
	product_price_point_type?: string;
	next_product_price_point_id?: number;
	net_terms?: number;
	stored_credential_transaction_id?: number;
	reference?: string;
	on_hold_at?: string;
	prepaid_dunning?: boolean;
	coupons?: ICoupon[];
	dunning_communication_delay_enabled?: boolean;
	dunning_communication_delay_time_zone?: string;
	receives_invoice_emails?: boolean;
	locale?: string;
	currency?: string;
	scheduled_cancellation_at?: string;
	credit_balance_in_cents?: number;
	prepayment_balance_in_cents?: number;
}

// Customer Types
export interface ICustomer extends IDataObject {
	id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	cc_emails?: string;
	organization?: string;
	reference?: string;
	address?: string;
	address_2?: string;
	city?: string;
	state?: string;
	zip?: string;
	country?: string;
	phone?: string;
	verified?: boolean;
	portal_customer_created_at?: string;
	portal_invite_last_sent_at?: string;
	portal_invite_last_accepted_at?: string;
	tax_exempt?: boolean;
	vat_number?: string;
	parent_id?: number;
	locale?: string;
	default_subscription_group_uid?: string;
}

// Product Types
export interface IProduct extends IDataObject {
	id?: number;
	name?: string;
	handle?: string;
	description?: string;
	accounting_code?: string;
	request_credit_card?: boolean;
	expiration_interval?: number;
	expiration_interval_unit?: string;
	created_at?: string;
	updated_at?: string;
	price_in_cents?: number;
	interval?: number;
	interval_unit?: string;
	initial_charge_in_cents?: number;
	trial_price_in_cents?: number;
	trial_interval?: number;
	trial_interval_unit?: string;
	archived_at?: string;
	require_credit_card?: boolean;
	return_params?: string;
	taxable?: boolean;
	update_return_url?: string;
	initial_charge_after_trial?: boolean;
	version_number?: number;
	update_return_params?: string;
	product_family?: IProductFamily;
	public_signup_pages?: IDataObject[];
	product_price_point_name?: string;
	request_billing_address?: boolean;
	require_billing_address?: boolean;
	require_shipping_address?: boolean;
	tax_code?: string;
	default_product_price_point_id?: number;
	use_site_exchange_rate?: boolean;
	item_category?: string;
	product_price_point_id?: number;
	product_price_point_handle?: string;
}

// Product Family Types
export interface IProductFamily extends IDataObject {
	id?: number;
	name?: string;
	handle?: string;
	accounting_code?: string;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

// Component Types
export interface IComponent extends IDataObject {
	id?: number;
	name?: string;
	handle?: string;
	pricing_scheme?: string;
	unit_name?: string;
	unit_price?: string;
	product_family_id?: number;
	product_family_name?: string;
	price_per_unit_in_cents?: number;
	kind?: string;
	archived?: boolean;
	taxable?: boolean;
	description?: string;
	default_price_point_id?: number;
	overage_prices?: IDataObject[];
	prices?: IComponentPrice[];
	price_point_count?: number;
	price_points_url?: string;
	default_price_point_name?: string;
	tax_code?: string;
	recurring?: boolean;
	upgrade_charge?: string;
	downgrade_credit?: string;
	created_at?: string;
	updated_at?: string;
	archived_at?: string;
	hide_date_range_on_invoice?: boolean;
	allow_fractional_quantities?: boolean;
	item_category?: string;
	use_site_exchange_rate?: boolean;
	accounting_code?: string;
	event_based_billing_metric_id?: number;
	interval?: number;
	interval_unit?: string;
}

export interface IComponentPrice extends IDataObject {
	id?: number;
	component_id?: number;
	starting_quantity?: number;
	ending_quantity?: number;
	unit_price?: string;
	price_point_id?: number;
	formatted_unit_price?: string;
	segment_id?: number;
}

export interface IComponentAllocation extends IDataObject {
	component_id?: number;
	subscription_id?: number;
	quantity?: number;
	previous_quantity?: number;
	memo?: string;
	timestamp?: string;
	proration_upgrade_scheme?: string;
	proration_downgrade_scheme?: string;
	price_point_id?: number;
	price_point_name?: string;
	price_point_handle?: string;
	previous_price_point_id?: number;
	accrue_charge?: boolean;
	upgrade_charge?: string;
	downgrade_credit?: string;
	payment?: IDataObject;
}

// Invoice Types
export interface IInvoice extends IDataObject {
	id?: number;
	uid?: string;
	site_id?: number;
	customer_id?: number;
	subscription_id?: number;
	number?: string;
	sequence_number?: number;
	transaction_time?: string;
	created_at?: string;
	updated_at?: string;
	issue_date?: string;
	due_date?: string;
	paid_date?: string;
	status?: string;
	role?: string;
	parent_invoice_id?: number;
	collection_method?: string;
	payment_instructions?: string;
	currency?: string;
	consolidation_level?: string;
	parent_invoice_uid?: string;
	subscription_group_id?: number;
	parent_invoice_number?: number;
	group_primary_subscription_id?: number;
	product_name?: string;
	product_family_name?: string;
	seller?: IDataObject;
	customer?: IDataObject;
	payer?: IDataObject;
	recipient_emails?: string[];
	net_terms?: number;
	memo?: string;
	billing_address?: IDataObject;
	shipping_address?: IDataObject;
	subtotal_amount?: string;
	discount_amount?: string;
	tax_amount?: string;
	total_amount?: string;
	credit_amount?: string;
	refund_amount?: string;
	paid_amount?: string;
	due_amount?: string;
	line_items?: IInvoiceLineItem[];
	discounts?: IDataObject[];
	taxes?: IDataObject[];
	credits?: IDataObject[];
	refunds?: IDataObject[];
	payments?: IDataObject[];
	custom_fields?: IDataObject[];
	display_settings?: IDataObject;
	public_url?: string;
	previous_balance_data?: IDataObject;
}

export interface IInvoiceLineItem extends IDataObject {
	uid?: string;
	title?: string;
	description?: string;
	quantity?: string;
	unit_price?: string;
	subtotal_amount?: string;
	discount_amount?: string;
	tax_amount?: string;
	total_amount?: string;
	tiered_unit_price?: boolean;
	period_range_start?: string;
	period_range_end?: string;
	transaction_id?: number;
	product_id?: number;
	product_version?: number;
	component_id?: number;
	price_point_id?: number;
	hide?: boolean;
	component_cost_data?: IDataObject;
	product_price_point_id?: number;
	custom_item?: boolean;
	kind?: string;
}

// Payment Profile Types
export interface IPaymentProfile extends IDataObject {
	id?: number;
	first_name?: string;
	last_name?: string;
	masked_card_number?: string;
	card_type?: string;
	expiration_month?: number;
	expiration_year?: number;
	customer_id?: number;
	current_vault?: string;
	vault_token?: string;
	billing_address?: string;
	billing_city?: string;
	billing_state?: string;
	billing_zip?: string;
	billing_country?: string;
	customer_vault_token?: string;
	billing_address_2?: string;
	payment_type?: string;
	disabled?: boolean;
	chargify_token?: string;
	site_gateway_setting_id?: number;
	gateway_handle?: string;
	bank_name?: string;
	masked_bank_routing_number?: string;
	masked_bank_account_number?: string;
	bank_account_type?: string;
	bank_account_holder_type?: string;
	verified?: boolean;
}

// Coupon Types
export interface ICoupon extends IDataObject {
	id?: number;
	name?: string;
	code?: string;
	description?: string;
	amount?: number;
	amount_in_cents?: number;
	product_family_id?: number;
	product_family_name?: string;
	start_date?: string;
	end_date?: string;
	percentage?: string;
	recurring?: boolean;
	recurring_scheme?: string;
	duration_period_count?: number;
	duration_interval?: number;
	duration_interval_unit?: string;
	duration_interval_span?: string;
	allow_negative_balance?: boolean;
	archived_at?: string;
	conversion_limit?: string;
	stackable?: boolean;
	compounding_strategy?: string;
	use_site_exchange_rate?: boolean;
	created_at?: string;
	updated_at?: string;
	discount_type?: string;
	exclude_mid_period_allocations?: boolean;
	apply_on_cancel_at_end_of_period?: boolean;
	apply_on_subscription_expiration?: boolean;
	coupon_restrictions?: IDataObject[];
}

// Statement Types
export interface IStatement extends IDataObject {
	id?: number;
	subscription_id?: number;
	opened_at?: string;
	closed_at?: string;
	settled_at?: string;
	text_view?: string;
	basic_html_view?: string;
	html_view?: string;
	future_payments?: IDataObject[];
	starting_balance_in_cents?: number;
	ending_balance_in_cents?: number;
	customer_first_name?: string;
	customer_last_name?: string;
	customer_organization?: string;
	customer_shipping_address?: string;
	customer_shipping_address_2?: string;
	customer_shipping_city?: string;
	customer_shipping_state?: string;
	customer_shipping_country?: string;
	customer_shipping_zip?: string;
	customer_billing_address?: string;
	customer_billing_address_2?: string;
	customer_billing_city?: string;
	customer_billing_state?: string;
	customer_billing_country?: string;
	customer_billing_zip?: string;
	transactions?: IDataObject[];
	events?: IDataObject[];
	created_at?: string;
	updated_at?: string;
}

// Transaction Types
export interface ITransaction extends IDataObject {
	id?: number;
	subscription_id?: number;
	type?: string;
	kind?: string;
	transaction_type?: string;
	success?: boolean;
	amount_in_cents?: number;
	memo?: string;
	created_at?: string;
	starting_balance_in_cents?: number;
	ending_balance_in_cents?: number;
	gateway_used?: string;
	gateway_transaction_id?: string;
	gateway_response_code?: string;
	gateway_order_id?: string;
	payment_id?: number;
	product_id?: number;
	tax_id?: number;
	component_id?: number;
	statement_id?: number;
	customer_id?: number;
	item_name?: string;
	period_range_start?: string;
	period_range_end?: string;
	currency?: string;
	exchange_rate?: string;
	invoice_id?: number;
	invoice_number?: string;
	card_number?: string;
	card_expiration?: string;
	card_type?: string;
	refunded_amount_in_cents?: number;
	original_amount_in_cents?: number;
}

// Webhook Types
export interface IWebhookEndpoint extends IDataObject {
	id?: number;
	url?: string;
	site_id?: number;
	status?: string;
	webhook_subscriptions?: string[];
}

export interface IWebhook extends IDataObject {
	id?: number;
	successful?: boolean;
	event?: string;
	webhook_id?: number;
	body?: string;
	signature?: string;
	signature_hmac_sha_256?: string;
	accepted_at?: string;
	last_error?: string;
	last_error_at?: string;
	last_sent_at?: string;
	last_sent_url?: string;
	created_at?: string;
}

// Site Types
export interface ISite extends IDataObject {
	id?: number;
	name?: string;
	subdomain?: string;
	currency?: string;
	seller_id?: number;
	non_primary_currencies?: string[];
	relationship_invoicing_enabled?: boolean;
	customer_hierarchy_enabled?: boolean;
	whopays_enabled?: boolean;
	whopays_default_payer?: string;
	allocation_settings?: IDataObject;
	default_payment_collection_method?: string;
	organization_address?: IDataObject;
	tax_configuration?: IDataObject;
	net_terms?: IDataObject;
	test?: boolean;
}

// Metadata Types
export interface IMetadata extends IDataObject {
	id?: number;
	value?: string;
	resource_id?: number;
	name?: string;
	deleted_at?: string;
	metafield_id?: number;
}

// Prepayment Types
export interface IPrepayment extends IDataObject {
	id?: number;
	subscription_id?: number;
	amount_in_cents?: number;
	remaining_amount_in_cents?: number;
	refunded_amount_in_cents?: number;
	details?: string;
	external?: boolean;
	memo?: string;
	payment_type?: string;
	created_at?: string;
}

// Usage Types
export interface IUsage extends IDataObject {
	id?: number;
	memo?: string;
	created_at?: string;
	price_point_id?: number;
	quantity?: number;
	overage_quantity?: number;
	component_id?: number;
	component_handle?: string;
	subscription_id?: number;
}

// Price Point Types
export interface IPricePoint extends IDataObject {
	id?: number;
	name?: string;
	handle?: string;
	pricing_scheme?: string;
	prices?: IComponentPrice[];
	use_site_exchange_rate?: boolean;
	tax_included?: boolean;
	interval?: number;
	interval_unit?: string;
	overage_pricing?: IDataObject;
	rollover_prepaid_remainder?: boolean;
	renew_prepaid_allocation?: boolean;
	expiration_interval?: number;
	expiration_interval_unit?: string;
	type?: string;
	default?: boolean;
	archived_at?: string;
	created_at?: string;
	updated_at?: string;
}

// Event Types
export interface IEvent extends IDataObject {
	id?: number;
	key?: string;
	message?: string;
	subscription_id?: number;
	customer_id?: number;
	created_at?: string;
	event_specific_data?: IDataObject;
}

// Credit Note Types
export interface ICreditNote extends IDataObject {
	uid?: string;
	site_id?: number;
	customer_id?: number;
	subscription_id?: number;
	number?: string;
	sequence_number?: number;
	issue_date?: string;
	applied_date?: string;
	status?: string;
	currency?: string;
	memo?: string;
	seller?: IDataObject;
	customer?: IDataObject;
	billing_address?: IDataObject;
	shipping_address?: IDataObject;
	subtotal_amount?: string;
	discount_amount?: string;
	tax_amount?: string;
	total_amount?: string;
	applied_amount?: string;
	remaining_amount?: string;
	line_items?: IDataObject[];
	discounts?: IDataObject[];
	taxes?: IDataObject[];
	applications?: IDataObject[];
	refunds?: IDataObject[];
	origin_invoices?: IDataObject[];
}

// API Response Types
export interface IMaxioResponse<T> {
	data?: T | T[];
	meta?: IDataObject;
	[key: string]: T | T[] | IDataObject | string | number | boolean | null | undefined;
}

// Pagination Types
export interface IPaginationParams extends IDataObject {
	page?: number;
	per_page?: number;
	direction?: 'asc' | 'desc';
}

// Filter Types
export interface ISubscriptionFilter extends IPaginationParams {
	state?: string;
	product?: number;
	product_price_point_id?: number;
	coupon?: number;
	date_field?: string;
	start_date?: string;
	end_date?: string;
	start_datetime?: string;
	end_datetime?: string;
	metadata?: IDataObject;
	sort?: string;
	include?: string[];
}

export interface ICustomerFilter extends IPaginationParams {
	q?: string;
	date_field?: string;
	start_date?: string;
	end_date?: string;
	start_datetime?: string;
	end_datetime?: string;
}

export interface IInvoiceFilter extends IPaginationParams {
	status?: string;
	subscription_id?: number;
	start_date?: string;
	end_date?: string;
	date_field?: string;
	direction?: 'asc' | 'desc';
	customer_ids?: number[];
	number?: string[];
	product_ids?: number[];
	sort?: string;
	line_items?: boolean;
	discounts?: boolean;
	taxes?: boolean;
	credits?: boolean;
	payments?: boolean;
	custom_fields?: boolean;
	refunds?: boolean;
}

export interface ITransactionFilter extends IPaginationParams {
	transaction_type?: string;
	since_id?: number;
	max_id?: number;
	direction?: 'asc' | 'desc';
	since_date?: string;
	until_date?: string;
}

// Webhook Event Types
export type MaxioWebhookEvent =
	| 'billing_date_change'
	| 'component_allocation_change'
	| 'customer_create'
	| 'customer_update'
	| 'customer_delete'
	| 'delayed_signup_creation_failure'
	| 'delayed_signup_creation_success'
	| 'dunning_step_reached'
	| 'expiring_card'
	| 'expiration_date_change'
	| 'invoice_issued'
	| 'metered_usage'
	| 'payment_failure'
	| 'payment_success'
	| 'prepaid_usage'
	| 'prepaid_subscription_balance_changed'
	| 'refund_failure'
	| 'refund_success'
	| 'renewal_failure'
	| 'renewal_success'
	| 'signup_failure'
	| 'signup_success'
	| 'statement_closed'
	| 'statement_settled'
	| 'subscription_card_update'
	| 'subscription_group_signup_failure'
	| 'subscription_group_signup_success'
	| 'subscription_product_change'
	| 'subscription_state_change'
	| 'upcoming_renewal_notice'
	| 'upgrade_downgrade_failure'
	| 'upgrade_downgrade_success'
	| 'pending_cancellation_change';
