/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { camelToSnake, snakeToCamel, convertKeysToSnakeCase, convertKeysToCamelCase } from '../../nodes/Maxio/GenericFunctions';

describe('GenericFunctions', () => {
	describe('camelToSnake', () => {
		it('should convert camelCase to snake_case', () => {
			expect(camelToSnake('firstName')).toBe('first_name');
			expect(camelToSnake('lastName')).toBe('last_name');
			expect(camelToSnake('customerId')).toBe('customer_id');
		});

		it('should handle already snake_case strings', () => {
			expect(camelToSnake('first_name')).toBe('first_name');
			expect(camelToSnake('customer_id')).toBe('customer_id');
		});

		it('should handle single words', () => {
			expect(camelToSnake('name')).toBe('name');
			expect(camelToSnake('id')).toBe('id');
		});

		it('should handle multiple uppercase letters', () => {
			expect(camelToSnake('subscriptionID')).toBe('subscription_i_d');
			expect(camelToSnake('userAPIKey')).toBe('user_a_p_i_key');
		});
	});

	describe('snakeToCamel', () => {
		it('should convert snake_case to camelCase', () => {
			expect(snakeToCamel('first_name')).toBe('firstName');
			expect(snakeToCamel('last_name')).toBe('lastName');
			expect(snakeToCamel('customer_id')).toBe('customerId');
		});

		it('should handle already camelCase strings', () => {
			expect(snakeToCamel('firstName')).toBe('firstName');
			expect(snakeToCamel('customerId')).toBe('customerId');
		});

		it('should handle single words', () => {
			expect(snakeToCamel('name')).toBe('name');
			expect(snakeToCamel('id')).toBe('id');
		});

		it('should handle multiple underscores', () => {
			expect(snakeToCamel('current_period_starts_at')).toBe('currentPeriodStartsAt');
			expect(snakeToCamel('payment_profile_id')).toBe('paymentProfileId');
		});
	});

	describe('convertKeysToSnakeCase', () => {
		it('should convert object keys to snake_case', () => {
			const input = {
				firstName: 'John',
				lastName: 'Doe',
				customerId: 123,
			};
			const expected = {
				first_name: 'John',
				last_name: 'Doe',
				customer_id: 123,
			};
			expect(convertKeysToSnakeCase(input)).toEqual(expected);
		});

		it('should handle nested objects', () => {
			const input = {
				customerInfo: {
					firstName: 'John',
					lastName: 'Doe',
				},
			};
			const expected = {
				customer_info: {
					first_name: 'John',
					last_name: 'Doe',
				},
			};
			expect(convertKeysToSnakeCase(input)).toEqual(expected);
		});

		it('should handle arrays', () => {
			const input = {
				items: [
					{ itemName: 'Item 1' },
					{ itemName: 'Item 2' },
				],
			};
			const expected = {
				items: [
					{ item_name: 'Item 1' },
					{ item_name: 'Item 2' },
				],
			};
			expect(convertKeysToSnakeCase(input)).toEqual(expected);
		});

		it('should handle null and undefined', () => {
			expect(convertKeysToSnakeCase(null as any)).toEqual({});
			expect(convertKeysToSnakeCase(undefined as any)).toEqual({});
		});
	});

	describe('convertKeysToCamelCase', () => {
		it('should convert object keys to camelCase', () => {
			const input = {
				first_name: 'John',
				last_name: 'Doe',
				customer_id: 123,
			};
			const expected = {
				firstName: 'John',
				lastName: 'Doe',
				customerId: 123,
			};
			expect(convertKeysToCamelCase(input)).toEqual(expected);
		});

		it('should handle nested objects', () => {
			const input = {
				customer_info: {
					first_name: 'John',
					last_name: 'Doe',
				},
			};
			const expected = {
				customerInfo: {
					firstName: 'John',
					lastName: 'Doe',
				},
			};
			expect(convertKeysToCamelCase(input)).toEqual(expected);
		});

		it('should handle arrays', () => {
			const input = {
				items: [
					{ item_name: 'Item 1' },
					{ item_name: 'Item 2' },
				],
			};
			const expected = {
				items: [
					{ itemName: 'Item 1' },
					{ itemName: 'Item 2' },
				],
			};
			expect(convertKeysToCamelCase(input)).toEqual(expected);
		});
	});
});
