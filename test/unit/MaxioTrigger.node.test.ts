/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { MaxioTrigger } from '../../nodes/Maxio/MaxioTrigger.node';

describe('MaxioTrigger Node', () => {
	let maxioTriggerNode: MaxioTrigger;

	beforeEach(() => {
		maxioTriggerNode = new MaxioTrigger();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(maxioTriggerNode.description.displayName).toBe('Maxio Trigger');
		});

		it('should have correct name', () => {
			expect(maxioTriggerNode.description.name).toBe('maxioTrigger');
		});

		it('should have correct group', () => {
			expect(maxioTriggerNode.description.group).toContain('trigger');
		});

		it('should have correct version', () => {
			expect(maxioTriggerNode.description.version).toBe(1);
		});

		it('should use maxioApi credentials', () => {
			const credentials = maxioTriggerNode.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials![0].name).toBe('maxioApi');
		});
	});

	describe('Webhook Properties', () => {
		it('should have events property', () => {
			const eventsProperty = maxioTriggerNode.description.properties.find(
				(p) => p.name === 'events'
			);
			expect(eventsProperty).toBeDefined();
			expect(eventsProperty!.type).toBe('multiOptions');
		});

		it('should have all event types', () => {
			const eventsProperty = maxioTriggerNode.description.properties.find(
				(p) => p.name === 'events'
			);
			const options = eventsProperty!.options as Array<{ value: string }>;
			
			expect(options.length).toBeGreaterThan(20);
			
			const eventValues = options.map((o) => o.value);
			expect(eventValues).toContain('signup_success');
			expect(eventValues).toContain('payment_success');
			expect(eventValues).toContain('payment_failure');
			expect(eventValues).toContain('subscription_state_change');
			expect(eventValues).toContain('invoice_issued');
		});
	});

	describe('Webhook Methods', () => {
		it('should have webhookMethods defined', () => {
			expect(maxioTriggerNode.webhookMethods).toBeDefined();
			expect(maxioTriggerNode.webhookMethods!.default).toBeDefined();
		});

		it('should have checkExists method', () => {
			expect(maxioTriggerNode.webhookMethods!.default.checkExists).toBeDefined();
		});

		it('should have create method', () => {
			expect(maxioTriggerNode.webhookMethods!.default.create).toBeDefined();
		});

		it('should have delete method', () => {
			expect(maxioTriggerNode.webhookMethods!.default.delete).toBeDefined();
		});
	});

	describe('Webhook Handler', () => {
		it('should have webhook method defined', () => {
			expect(maxioTriggerNode.webhook).toBeDefined();
		});
	});
});
