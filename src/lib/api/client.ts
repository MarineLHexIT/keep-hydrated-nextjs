import { auth } from '../auth/auth';    

export class AuthentifiedApiClient {
    private readonly timeout: number = 30000; // 30 seconds default timeout

    constructor(
        private readonly baseUrl: string,
        private readonly accessToken: string
    ) {}

    private getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
        };
    }

    private async handleResponse<T>(response: Response, errorMessage: string): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorMessage + (errorData ? `: ${JSON.stringify(errorData)}` : ''));
        }
        return await response.json();
    }

    private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async get<T>(path: string, options: { errorMessage: string }): Promise<T> {
        const response = await this.fetchWithTimeout(`${this.baseUrl}${path}`, {
            headers: this.getAuthHeaders(),
            mode: 'cors',
        });

        return this.handleResponse(response, options.errorMessage);
    }

    async post<T>(path: string, options: { body: string, errorMessage: string }): Promise<T> {
        const response = await this.fetchWithTimeout(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            mode: 'cors',
            body: options.body,
        });

        return this.handleResponse(response, options.errorMessage);
    }

    async put<T>(path: string, options: { body: string, errorMessage: string }): Promise<T> {
        const response = await this.fetchWithTimeout(`${this.baseUrl}${path}`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            mode: 'cors',
            body: options.body,
        });

        return this.handleResponse(response, options.errorMessage);
    }

    async delete<T>(path: string, options: { errorMessage: string }): Promise<T> {
        const response = await this.fetchWithTimeout(`${this.baseUrl}${path}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders(),
            mode: 'cors',
        });

        return this.handleResponse(response, options.errorMessage);
    }
}

export async function getClient() {
    const API_URL = process.env.API_URL;

    if (!API_URL) {
        throw new Error('API_URL must be defined in environment variables');
    }

    const session = await auth();

    if (!session?.user?.access_token) {
        throw new Error('No access token available');
    }

    const accessToken = session.user.access_token;

    return new AuthentifiedApiClient(API_URL, accessToken);
}