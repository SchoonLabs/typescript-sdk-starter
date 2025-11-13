import { SDK } from '../src';

/**
 * Basic SDK usage example
 *
 * Run with: pnpm tsx examples/basic.ts
 */

async function main() {
  // Initialize the SDK with minimal configuration
  const sdk = new SDK({
    apiKey: 'demo-api-key',
  });

  console.log('🚀 Basic SDK Example\n');

  try {
    // Fetch a single user
    console.log('Fetching user #1...');
    const user = await sdk.getUser(1);
    console.log('✓ User:', user);
    console.log();

    // List multiple users
    console.log('Fetching all users...');
    const users = await sdk.listUsers();
    console.log(`✓ Found ${users.length} users`);
    console.log('First 3 users:', users.slice(0, 3));
    console.log();

    // Create a new user
    console.log('Creating a new user...');
    const newUser = await sdk.createUser({
      name: 'Jane Doe',
      email: 'jane@example.com',
      username: 'janedoe',
    });
    console.log('✓ Created user:', newUser);
    console.log();

    console.log('✅ All operations completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
