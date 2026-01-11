/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Integration tests for Maxio API
 * 
 * These tests require valid Maxio API credentials to run.
 * Set the following environment variables before running:
 * - MAXIO_API_KEY: Your Maxio API key
 * - MAXIO_SUBDOMAIN: Your Maxio subdomain
 * 
 * Run with: npm run test:integration
 */

describe('Maxio API Integration', () => {
	const apiKey = process.env.MAXIO_API_KEY;
	const subdomain = process.env.MAXIO_SUBDOMAIN;

	const hasCredentials = apiKey && subdomain;

	describe('Connection Test', () => {
		(hasCredentials ? it : it.skip)('should connect to Maxio API', async () => {
			// This test will only run if credentials are provided
			const authString = Buffer.from(`${apiKey}:x`).toString('base64');
			
			const response = await fetch(`https://${subdomain}.chargify.com/site.json`, {
				headers: {
					'Authorization': `Basic ${authString}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
		});
	});

	describe('Subscription Operations', () => {
		(hasCredentials ? it : it.skip)('should list subscriptions', async () => {
			const authString = Buffer.from(`${apiKey}:x`).toString('base64');
			
			const response = await fetch(`https://${subdomain}.chargify.com/subscriptions.json?per_page=10`, {
				headers: {
					'Authorization': `Basic ${authString}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(Array.isArray(data)).toBe(true);
		});
	});

	describe('Customer Operations', () => {
		(hasCredentials ? it : it.skip)('should list customers', async () => {
			const authString = Buffer.from(`${apiKey}:x`).toString('base64');
			
			const response = await fetch(`https://${subdomain}.chargify.com/customers.json?per_page=10`, {
				headers: {
					'Authorization': `Basic ${authString}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(Array.isArray(data)).toBe(true);
		});
	});

	describe('Product Operations', () => {
		(hasCredentials ? it : it.skip)('should list products', async () => {
			const authString = Buffer.from(`${apiKey}:x`).toString('base64');
			
			const response = await fetch(`https://${subdomain}.chargify.com/products.json?per_page=10`, {
				headers: {
					'Authorization': `Basic ${authString}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(Array.isArray(data)).toBe(true);
		});
	});
});
