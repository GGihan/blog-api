const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY;

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);

  // Prepare standard headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers, // Merges custom headers passed into the function call
  };

  // Automatically attach your authorization token if it exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Construct the absolute path dynamically
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    medthod: 'GET',
    ...options,
    headers,
  });

  // Handle standard CORS or network dropouts cleanly
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  return response.json();
};