import { FormData } from '../store/apiSlice';

export interface ApiRequestOptions {
  suffix: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: FormData;
}

export async function apiRequest({ suffix, method, data }: ApiRequestOptions): Promise<any> {
  const url = `https://ya-praktikum.tech/api/v2/${suffix}`;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    console.log('Response:', response);

    if (response.ok) {
      return true;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    const text = await response.text();
    console.log('text answer', text);
    if (text === 'OK') {
      return true;
    }
    console.error('Unexpected response type:', text);
    throw new Error('Unexpected response type');
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
}

export async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await apiRequest({ suffix: 'auth/user', method: 'GET' });
    console.log('Response from API:', response);
    if (response && response.id !== '') {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Failed to check auth status:', error);
    return false;
  }
}
