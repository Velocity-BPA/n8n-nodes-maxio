/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Make an authenticated request to the Maxio API
 */
export async function maxioApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('maxioApi');

	const apiKey = credentials.apiKey as string;
	const subdomain = credentials.subdomain as string;

	const options: IRequestOptions = {
		method,
		uri: `https://${subdomain}.chargify.com${endpoint}`,
		headers: {
			Authorization: `Basic ${Buffer.from(`${apiKey}:x`).toString('base64')}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	if (Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request and return all items using pagination
 */
export async function maxioApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	dataKey?: string,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let page = 1;
	const perPage = 200;

	query.per_page = perPage;

	while (true) {
		query.page = page;

		const response = await maxioApiRequest.call(this, method, endpoint, body, query);

		let items: IDataObject[];
		if (dataKey && response && typeof response === 'object' && dataKey in response) {
			items = (response as IDataObject)[dataKey] as IDataObject[];
		} else if (Array.isArray(response)) {
			items = response;
		} else {
			break;
		}

		if (items && Array.isArray(items)) {
			returnData.push(...items);

			if (items.length < perPage) {
				break;
			}
		} else {
			break;
		}

		page++;
	}

	return returnData;
}

/**
 * Handle Maxio API errors with better messaging
 */
export function handleMaxioError(error: unknown): never {
	const errorObj = error as IDataObject;
	
	if (errorObj.errors) {
		if (Array.isArray(errorObj.errors)) {
			throw new Error(`Maxio API Error: ${(errorObj.errors as string[]).join(', ')}`);
		} else if (typeof errorObj.errors === 'object') {
			const messages: string[] = [];
			for (const [key, value] of Object.entries(errorObj.errors as IDataObject)) {
				if (Array.isArray(value)) {
					messages.push(`${key}: ${value.join(', ')}`);
				}
			}
			throw new Error(`Maxio API Error: ${messages.join('; ')}`);
		}
	}

	throw error;
}

/**
 * Convert snake_case to camelCase
 */
export function snakeToCamel(str: string): string {
	return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/**
 * Alias for snakeToCamel
 */
export const toCamelCase = snakeToCamel;

/**
 * Convert camelCase to snake_case
 */
export function camelToSnake(str: string): string {
	return str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
}

/**
 * Alias for camelToSnake
 */
export const toSnakeCase = camelToSnake;

/**
 * Convert object keys from camelCase to snake_case
 */
export function convertKeysToSnakeCase(obj: IDataObject | null | undefined): IDataObject {
	if (obj === null || obj === undefined) {
		return {};
	}
	const result: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		const snakeKey = camelToSnake(key);
		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			result[snakeKey] = convertKeysToSnakeCase(value as IDataObject);
		} else if (Array.isArray(value)) {
			result[snakeKey] = value.map((item) => {
				if (item !== null && typeof item === 'object') {
					return convertKeysToSnakeCase(item as IDataObject);
				}
				return item;
			});
		} else {
			result[snakeKey] = value;
		}
	}
	return result;
}

/**
 * Convert object keys from snake_case to camelCase
 */
export function convertKeysToCamelCase(obj: IDataObject): IDataObject {
	const result: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		const camelKey = snakeToCamel(key);
		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			result[camelKey] = convertKeysToCamelCase(value as IDataObject);
		} else if (Array.isArray(value)) {
			result[camelKey] = value.map((item) => {
				if (item !== null && typeof item === 'object') {
					return convertKeysToCamelCase(item as IDataObject);
				}
				return item;
			});
		} else {
			result[camelKey] = value;
		}
	}
	return result;
}

/**
 * Extract the actual data from a Maxio API response
 * Maxio wraps responses in resource name keys (e.g., { subscription: {...} })
 */
export function extractData(response: IDataObject | IDataObject[], resourceKey?: string): IDataObject | IDataObject[] {
	if (Array.isArray(response)) {
		return response.map((item) => {
			if (resourceKey && item[resourceKey]) {
				return item[resourceKey] as IDataObject;
			}
			// Try common wrapping patterns
			const keys = Object.keys(item);
			if (keys.length === 1) {
				return item[keys[0]] as IDataObject;
			}
			return item;
		});
	}

	if (resourceKey && response[resourceKey]) {
		return response[resourceKey] as IDataObject;
	}

	// Try to unwrap single-key objects
	const keys = Object.keys(response);
	if (keys.length === 1 && typeof response[keys[0]] === 'object') {
		return response[keys[0]] as IDataObject;
	}

	return response;
}

/**
 * Build filter query parameters from additional fields
 */
export function buildFilterQuery(additionalFields: IDataObject): IDataObject {
	const query: IDataObject = {};

	for (const [key, value] of Object.entries(additionalFields)) {
		if (value !== undefined && value !== null && value !== '') {
			const snakeKey = camelToSnake(key);
			
			// Handle nested filter fields
			if (key.startsWith('filter')) {
				const filterKey = key.replace('filter', '').replace(/^[A-Z]/, (c) => c.toLowerCase());
				query[`filter[${camelToSnake(filterKey)}]`] = value;
			} else if (key === 'include' && Array.isArray(value)) {
				query.include = (value as string[]).join(',');
			} else {
				query[snakeKey] = value;
			}
		}
	}

	return query;
}

/**
 * Validate required fields
 */
export function validateRequiredFields(data: IDataObject, requiredFields: string[]): void {
	const missingFields: string[] = [];
	
	for (const field of requiredFields) {
		if (data[field] === undefined || data[field] === null || data[field] === '') {
			missingFields.push(field);
		}
	}

	if (missingFields.length > 0) {
		throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
	}
}

/**
 * Format cents to currency string
 */
export function formatCentsToCurrency(cents: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(cents / 100);
}

/**
 * Parse currency string to cents
 */
export function parseCurrencyToCents(amount: string | number): number {
	if (typeof amount === 'number') {
		return Math.round(amount * 100);
	}
	// Remove currency symbols and convert to number
	const numericValue = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
	return Math.round(numericValue * 100);
}

/**
 * Format ISO date string to Maxio date format
 */
export function formatDateForMaxio(date: string | Date): string {
	const d = date instanceof Date ? date : new Date(date);
	return d.toISOString();
}

/**
 * Wait for a specified number of milliseconds
 */
export async function wait(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
	fn: () => Promise<T>,
	maxRetries = 3,
	initialDelay = 1000,
): Promise<T> {
	let lastError: Error | undefined;
	
	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;
			
			// Check if it's a rate limit error
			const errorMessage = lastError.message || '';
			if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
				if (attempt < maxRetries) {
					const delay = initialDelay * Math.pow(2, attempt);
					await wait(Math.min(delay, 60000)); // Max 60 seconds
					continue;
				}
			}
			
			throw error;
		}
	}

	throw lastError;
}

/**
 * Simplify error messages for common Maxio errors
 */
export function simplifyError(error: unknown): string {
	const err = error as IDataObject;
	
	if (err.statusCode === 401) {
		return 'Invalid API credentials. Please check your API key and subdomain.';
	}
	
	if (err.statusCode === 403) {
		return 'Access denied. Your API key may not have permission for this action.';
	}
	
	if (err.statusCode === 404) {
		return 'Resource not found. Please verify the ID or handle is correct.';
	}
	
	if (err.statusCode === 422) {
		if (err.errors) {
			if (Array.isArray(err.errors)) {
				return `Validation error: ${(err.errors as string[]).join(', ')}`;
			}
			return `Validation error: ${JSON.stringify(err.errors)}`;
		}
		return 'Validation error. Please check your input data.';
	}
	
	if (err.statusCode === 429) {
		return 'Rate limit exceeded. Please wait and try again.';
	}
	
	if (err.message) {
		return err.message as string;
	}
	
	return 'An unexpected error occurred.';
}
