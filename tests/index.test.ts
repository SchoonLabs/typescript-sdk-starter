import { describe, it, expect } from 'vitest';
import { greet, SDK } from '../src';

describe('greet', () => {
  it('should return a greeting without exclamation by default', () => {
    expect(greet({ name: 'World' })).toBe('Hello, World');
  });

  it('should return an enthusiastic greeting when specified', () => {
    expect(greet({ name: 'World', enthusiastic: true })).toBe('Hello, World!');
  });
});

describe('SDK', () => {
  it('should store and return the API key', () => {
    const apiKey = 'test-api-key';
    const sdk = new SDK(apiKey);
    expect(sdk.getApiKey()).toBe(apiKey);
  });
});
