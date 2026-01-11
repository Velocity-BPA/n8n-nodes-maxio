/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Maxio } from '../../nodes/Maxio/Maxio.node';

describe('Maxio Node', () => {
	let maxioNode: Maxio;

	beforeEach(() => {
		maxioNode = new Maxio();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(maxioNode.description.displayName).toBe('Maxio');
		});

		it('should have correct name', () => {
			expect(maxioNode.description.name).toBe('maxio');
		});

		it('should have correct group', () => {
			expect(maxioNode.description.group).toContain('transform');
		});

		it('should have correct version', () => {
			expect(maxioNode.description.version).toBe(1);
		});

		it('should use maxioApi credentials', () => {
			const credentials = maxioNode.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials![0].name).toBe('maxioApi');
		});
	});

	describe('Resources', () => {
		it('should have all 12 resources defined', () => {
			const resourceProperty = maxioNode.description.properties.find(
				(p) => p.name === 'resource'
			);
			expect(resourceProperty).toBeDefined();
			
			const options = resourceProperty!.options as Array<{ value: string }>;
			expect(options.length).toBe(12);
			
			const resourceValues = options.map((o) => o.value);
			expect(resourceValues).toContain('subscription');
			expect(resourceValues).toContain('customer');
			expect(resourceValues).toContain('product');
			expect(resourceValues).toContain('component');
			expect(resourceValues).toContain('invoice');
			expect(resourceValues).toContain('paymentProfile');
			expect(resourceValues).toContain('coupon');
			expect(resourceValues).toContain('productFamily');
			expect(resourceValues).toContain('statement');
			expect(resourceValues).toContain('transaction');
			expect(resourceValues).toContain('webhook');
			expect(resourceValues).toContain('site');
		});
	});

	describe('Operations', () => {
		it('should have operations for subscription resource', () => {
			const operationProperty = maxioNode.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('subscription')
			);
			expect(operationProperty).toBeDefined();
			
			const options = operationProperty!.options as Array<{ value: string }>;
			expect(options.length).toBeGreaterThan(10);
		});

		it('should have operations for customer resource', () => {
			const operationProperty = maxioNode.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('customer')
			);
			expect(operationProperty).toBeDefined();
			
			const options = operationProperty!.options as Array<{ value: string }>;
			expect(options.length).toBeGreaterThan(5);
		});

		it('should have operations for invoice resource', () => {
			const operationProperty = maxioNode.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('invoice')
			);
			expect(operationProperty).toBeDefined();
			
			const options = operationProperty!.options as Array<{ value: string }>;
			expect(options.length).toBeGreaterThan(5);
		});
	});
});
