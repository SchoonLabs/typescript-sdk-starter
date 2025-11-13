import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SDK, SDKError } from '../src';

// Mock fetch globally
global.fetch = vi.fn();

describe('SDK', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = new SDK({
      apiKey: 'test-api-key',
      baseURL: 'https://api.example.com',
      timeout: 5000,
    });
    vi.clearAllMocks();
  });

  describe('configuration', () => {
    it('should initialize with provided config', () => {
      const config = sdk.getConfig();
      expect(config.apiKey).toBe('test-api-key');
      expect(config.baseURL).toBe('https://api.example.com');
      expect(config.timeout).toBe(5000);
    });

    it('should use default values when not provided', () => {
      const defaultSdk = new SDK({ apiKey: 'key' });
      const config = defaultSdk.getConfig();
      expect(config.baseURL).toBe('https://jsonplaceholder.typicode.com');
      expect(config.timeout).toBe(5000);
    });
  });

  describe('getUser', () => {
    it('should fetch a user successfully', async () => {
      const mockUser = { id: 1, name: 'John', email: 'john@example.com' };

      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockUser,
        headers: new Headers(),
      });

      const user = await sdk.getUser(1);
      expect(user).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-api-key',
          }),
        })
      );
    });

    it('should throw SDKError on API error', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
      });

      await expect(sdk.getUser(999)).rejects.toThrow(SDKError);
      await expect(sdk.getUser(999)).rejects.toThrow('API request failed');
    });
  });

  describe('listUsers', () => {
    it('should fetch all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' },
      ];

      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockUsers,
        headers: new Headers(),
      });

      const users = await sdk.listUsers();
      expect(users).toEqual(mockUsers);
      expect(users).toHaveLength(2);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = { name: 'Jane', email: 'jane@example.com' };
      const mockResponse = { id: 3, ...newUser };

      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockResponse,
        headers: new Headers(),
      });

      const user = await sdk.createUser(newUser);
      expect(user).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newUser),
        })
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updates = { name: 'Updated Name' };
      const mockResponse = {
        id: 1,
        name: 'Updated Name',
        email: 'test@example.com',
      };

      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
        headers: new Headers(),
      });

      const user = await sdk.updateUser(1, updates);
      expect(user).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updates),
        })
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: async () => ({}),
        headers: new Headers(),
      });

      await expect(sdk.deleteUser(1)).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });
});

describe('SDKError', () => {
  it('should create an error with code and message', () => {
    const error = new SDKError('Test error', 'TEST_CODE');
    expect(error.message).toBe('Test error');
    expect(error.code).toBe('TEST_CODE');
    expect(error.name).toBe('SDKError');
  });

  it('should include status code when provided', () => {
    const error = new SDKError('Not found', 'NOT_FOUND', 404);
    expect(error.statusCode).toBe(404);
  });
});
