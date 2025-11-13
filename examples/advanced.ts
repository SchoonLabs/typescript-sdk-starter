import { SDK, SDKError } from '../src';

/**
 * Advanced SDK usage example showing configuration options and error handling
 *
 * Run with: pnpm tsx examples/advanced.ts
 */

async function main() {
  console.log('🚀 Advanced SDK Example\n');

  // Initialize SDK with custom configuration
  const sdk = new SDK({
    apiKey: 'demo-api-key',
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000, // 10 second timeout
    headers: {
      'X-Custom-Header': 'custom-value',
    },
  });

  // Display current configuration
  console.log('Configuration:');
  const config = sdk.getConfig();
  console.log('- Base URL:', config.baseURL);
  console.log('- Timeout:', config.timeout, 'ms');
  console.log('- Custom headers:', config.headers);
  console.log();

  // Example 1: Successful operation
  console.log('Example 1: Fetching a user...');
  try {
    const user = await sdk.getUser(1);
    console.log('✓ Success:', user);
  } catch (error) {
    handleError(error);
  }
  console.log();

  // Example 2: Update user
  console.log('Example 2: Updating a user...');
  try {
    const updatedUser = await sdk.updateUser(1, {
      name: 'John Smith',
      email: 'john.smith@example.com',
    });
    console.log('✓ User updated:', updatedUser);
  } catch (error) {
    handleError(error);
  }
  console.log();

  // Example 3: Handling errors gracefully
  console.log('Example 3: Error handling (invalid user ID)...');
  try {
    await sdk.getUser(99999);
  } catch (error) {
    handleError(error);
  }
  console.log();

  // Example 4: Delete operation
  console.log('Example 4: Deleting a user...');
  try {
    await sdk.deleteUser(1);
    console.log('✓ User deleted successfully');
  } catch (error) {
    handleError(error);
  }
  console.log();

  // Example 5: Batch operations
  console.log('Example 5: Batch operations...');
  try {
    const userPromises = [1, 2, 3].map((id) => sdk.getUser(id));
    const users = await Promise.all(userPromises);
    console.log(`✓ Fetched ${users.length} users in parallel`);
    users.forEach((user) => console.log(`  - ${user.name} (${user.email})`));
  } catch (error) {
    handleError(error);
  }
  console.log();

  console.log('✅ Advanced examples completed!');
}

/**
 * Centralized error handler demonstrating best practices
 */
function handleError(error: unknown): void {
  if (error instanceof SDKError) {
    console.error(`❌ SDK Error [${error.code}]:`, error.message);
    if (error.statusCode) {
      console.error(`   HTTP Status: ${error.statusCode}`);
    }
  } else if (error instanceof Error) {
    console.error('❌ Unexpected error:', error.message);
  } else {
    console.error('❌ Unknown error:', error);
  }
}

main();
