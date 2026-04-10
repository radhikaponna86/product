import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Send Google OAuth token to backend for verification
 * @param {string} token - JWT token from Google
 * @returns {Promise<{token: string, user: object}>} Backend response with auth token and user info
 */
export const authenticateWithGoogle = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Backend error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Google authentication failed:', error);
    throw error;
  }
};

/**
 * Decode Google JWT token to extract user info
 * @param {string} token - JWT token from Google
 * @returns {object} Decoded token data
 */
export const decodeGoogleToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    throw new Error('Invalid token');
  }
};

/**
 * Store authentication data in localStorage
 * @param {string} authToken - Authentication token from backend
 * @param {object} user - User information
 */
export const storeAuthData = (authToken, user) => {
  localStorage.setItem('authToken', authToken);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Retrieve stored authentication data
 * @returns {object} {token: string, user: object} or null if not authenticated
 */
export const getAuthData = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (!token || !user) return null;
  
  return {
    token,
    user: JSON.parse(user),
  };
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthData()?.token;
};
