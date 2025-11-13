/**
 * Custom error class for SDK errors
 */
export class SDKError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'SDKError';
  }
}

/**
 * Configuration options for the SDK
 */
export interface SDKConfig {
  /** API key for authentication */
  apiKey: string;
  /** Base URL for API requests */
  baseURL?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom headers to include in all requests */
  headers?: Record<string, string>;
}

/**
 * Generic API response structure
 */
export interface APIResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

/**
 * Example user type from a typical API
 */
export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
}

/**
 * Main SDK class with realistic patterns for API integration
 */
export class SDK {
  private config: Required<SDKConfig>;

  constructor(config: SDKConfig) {
    this.config = {
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://jsonplaceholder.typicode.com',
      timeout: config.timeout || 5000,
      headers: config.headers || {},
    };
  }

  /**
   * Internal HTTP client wrapper
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
          ...this.config.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new SDKError(
          `API request failed: ${response.statusText}`,
          'API_ERROR',
          response.status
        );
      }

      const data = await response.json();
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      return {
        data,
        status: response.status,
        headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof SDKError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new SDKError(
            `Request timeout after ${this.config.timeout}ms`,
            'TIMEOUT'
          );
        }
        throw new SDKError(error.message, 'NETWORK_ERROR');
      }

      throw new SDKError('Unknown error occurred', 'UNKNOWN_ERROR');
    }
  }

  /**
   * Get the current API configuration
   */
  public getConfig(): Readonly<Required<SDKConfig>> {
    return { ...this.config };
  }

  /**
   * Fetch a user by ID
   */
  public async getUser(id: number): Promise<User> {
    const response = await this.request<User>(`/users/${id}`);
    return response.data;
  }

  /**
   * Fetch all users
   */
  public async listUsers(): Promise<User[]> {
    const response = await this.request<User[]>('/users');
    return response.data;
  }

  /**
   * Create a new user
   */
  public async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    return response.data;
  }

  /**
   * Update an existing user
   */
  public async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response = await this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
    });
    return response.data;
  }

  /**
   * Delete a user
   */
  public async deleteUser(id: number): Promise<void> {
    await this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}
