import { env } from '@/lib/config/env';
import type { APIResponse, ErrorResponse } from './types';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

type RequestConfig = {
  headers?: Record<string, string>;
  requiresAuth?: boolean;
} & Omit<RequestInit, 'headers'>;

export class APIClient {
  private static instance: APIClient;
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  private constructor() {
    this.baseUrl = env.API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private getAuthHeader(): Record<string, string> {
    // In a real app, you'd get this from your auth state/localStorage
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      throw new APIError(
        errorData.message || 'An error occurred',
        response.status,
        errorData.errors
      );
    }

    return (data as APIResponse<T>).data;
  }

  async request<T>(
    endpoint: string,
    { headers = {}, requiresAuth = true, ...config }: RequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const authHeaders = requiresAuth ? this.getAuthHeader() : {};

    const response = await fetch(url, {
      ...config,
      headers: {
        ...this.defaultHeaders,
        ...authHeaders,
        ...headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  async get<T>(endpoint: string, config: RequestConfig = {}) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, config: RequestConfig = {}) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown, config: RequestConfig = {}) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown, config: RequestConfig = {}) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const api = APIClient.getInstance(); 