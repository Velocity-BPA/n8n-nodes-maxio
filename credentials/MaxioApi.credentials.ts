/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MaxioApi implements ICredentialType {
	name = 'maxioApi';
	displayName = 'Maxio API';
	documentationUrl = 'https://developers.maxio.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Maxio API key from Config > Integrations > API Access',
		},
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'your-subdomain',
			description: 'Your Maxio subdomain (e.g., if your URL is https://acme.chargify.com, enter "acme")',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Basic " + Buffer.from($credentials.apiKey + ":x").toString("base64")}}',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials.subdomain}}.chargify.com',
			url: '/site.json',
			method: 'GET',
		},
	};
}
