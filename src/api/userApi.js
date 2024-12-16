export async function apiRequest(suffix, method, data) {
  const url = `https://ya-praktikum.tech/api/v2/${suffix}`;
  console.log('Sending request to:', url);
  console.log('Data:', data);
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

    if (!response.ok) {
      console.error('API request failed with status:', response.status);
      throw new Error('API request failed');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    const text = await response.text();
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

export async function checkAuthStatus() {
  try {
    const response = await apiRequest('auth/user', 'GET');
    console.log('Response from API:', response);
    if (response.id !== '') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to check auth status:', error);
    return false;
  }
}
