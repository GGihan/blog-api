const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY;

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);

  // Prepare standard headers
  const headers = {
    ...options.headers, // Merges custom headers passed into the function call
  };

  // Default to JSON for standard payloads
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Let the browser automatically generate the boundary header for FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  // Automatically attach your authorization token if it exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Construct the absolute path dynamically
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    ...options,
    headers,
  });

  // Handle standard CORS, network and validation errors
  if (!response.ok) {
    // errorData = { success: false, message: "Error message" }
    const errorData = await response.json().catch(() => ({}));
    // Clear token if expired, only on 401 expired/missing/bad token
    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    throw new ApiError(
      errorData.message,
      response.status,
      errorData
    );
  }

  return response.json();
};

export class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = data.errors || [];
  }

  // Instantly flattens express-validator errors array into a clean object
  unwrapFieldErrors() {
    const errorMap = {};
    this.errors.forEach(err => {
      if (err.field) errorMap[err.field] = err.message;
    });
    return errorMap; // Returns: { username: "Too short", email: "Invalid address" }
  }
};