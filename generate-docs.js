#!/usr/bin/env node

/**
 * FSS Measurement API Documentation Generator
 * 
 * This script helps generate Mintlify documentation files for API endpoints
 * based on the Postman collection and route files.
 */

const fs = require('fs');
const path = require('path');

// Template for API endpoint documentation
const endpointTemplate = (config) => `---
title: '${config.title}'
api: '${config.method} ${config.path}'
description: '${config.description}'
---

## Endpoint

\`\`\`
${config.method} ${config.path}
\`\`\`

${config.requiresAuth ? '<Note>This endpoint requires authentication</Note>\n' : ''}
## Headers

| Header | Value | Required |
|--------|-------|----------|
| platform | WEB, IOS, or ANDROID | Yes |
| api-key | FSS2023 | Yes |
| Content-Type | ${config.contentType || 'application/json'} | Yes |
| Accept | application/json | Yes |
${config.requiresAuth ? '| Authorization | Bearer {token} | Yes |' : ''}

## Request Body

${config.params.map(param => `
<ParamField body="${param.name}" type="${param.type}" ${param.required ? 'required' : ''}>
  ${param.description}
</ParamField>
`).join('\n')}

## Response

<ResponseField name="message" type="string">
  Success message
</ResponseField>

<ResponseField name="data" type="object">
  Response data object
</ResponseField>

<RequestExample>

\`\`\`bash cURL
curl --location '${config.baseUrl}${config.path}' \\
--header 'platform: WEB' \\
--header 'api-key: FSS2023' \\
${config.requiresAuth ? "--header 'Authorization: Bearer YOUR_TOKEN_HERE' \\\\" : ''}
--header 'Content-Type: ${config.contentType || 'application/json'}' \\
--header 'Accept: application/json' \\
--data-raw '{
${config.exampleBody}
}'
\`\`\`

\`\`\`javascript JavaScript
const response = await fetch('${config.baseUrl}${config.path}', {
  method: '${config.method}',
  headers: {
    'platform': 'WEB',
    'api-key': 'FSS2023',
    ${config.requiresAuth ? "'Authorization': 'Bearer YOUR_TOKEN_HERE'," : ''}
    'Content-Type': '${config.contentType || 'application/json'}',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    ${config.exampleBodyJS}
  })
});

const data = await response.json();
\`\`\`

\`\`\`python Python
import requests

response = requests.post(
    '${config.baseUrl}${config.path}',
    headers={
        'platform': 'WEB',
        'api-key': 'FSS2023',
        ${config.requiresAuth ? "'Authorization': 'Bearer YOUR_TOKEN_HERE'," : ''}
        'Content-Type': '${config.contentType || 'application/json'}',
        'Accept': 'application/json'
    },
    json={
        ${config.exampleBodyPython}
    }
)

data = response.json()
\`\`\`

\`\`\`php PHP
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => '${config.baseUrl}${config.path}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'platform: WEB',
    'api-key: FSS2023',
    ${config.requiresAuth ? "'Authorization: Bearer YOUR_TOKEN_HERE'," : ''}
    'Content-Type: ${config.contentType || 'application/json'}',
    'Accept: application/json'
  ],
  CURLOPT_POSTFIELDS => json_encode([
    ${config.exampleBodyPHP}
  ])
]);

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
\`\`\`

</RequestExample>

<ResponseExample>

\`\`\`json Success Response
{
  "message": "${config.successMessage}",
  "data": {
    ${config.exampleResponse}
  }
}
\`\`\`

\`\`\`json Error Response
{
  "message": "Error message",
  "status": 400
}
\`\`\`

</ResponseExample>

## Notes

${config.notes.map(note => `- ${note}`).join('\n')}
`;

// Example usage
const exampleConfig = {
  title: 'Get Profile',
  method: 'POST',
  path: '/user/get_profile',
  description: 'Retrieve user profile information',
  requiresAuth: true,
  contentType: 'application/json',
  baseUrl: 'https://api.fss-measurement.com/api',
  params: [
    {
      name: 'user_id',
      type: 'integer',
      required: false,
      description: 'User ID (optional, defaults to authenticated user)'
    }
  ],
  exampleBody: '    "user_id": 123',
  exampleBodyJS: 'user_id: 123',
  exampleBodyPython: "'user_id': 123",
  exampleBodyPHP: "'user_id' => 123",
  successMessage: 'Profile retrieved successfully',
  exampleResponse: '"id": 123,\n    "name": "John Doe",\n    "email": "john@example.com"',
  notes: [
    'If user_id is not provided, returns authenticated user\'s profile',
    'Requires active subscription'
  ]
};

console.log('FSS Measurement API Documentation Generator');
console.log('===========================================\n');
console.log('Example template:\n');
console.log(endpointTemplate(exampleConfig));

module.exports = { endpointTemplate };
