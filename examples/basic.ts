import { greet, SDK } from 'typescript-sdk-starter';

// Basic greeting
console.log(greet({ name: 'World' }));
// => "Hello, World"

// Enthusiastic greeting
console.log(greet({ name: 'World', enthusiastic: true }));
// => "Hello, World!"

// SDK usage
const sdk = new SDK('my-api-key');
console.log(sdk.getApiKey());
// => "my-api-key"
