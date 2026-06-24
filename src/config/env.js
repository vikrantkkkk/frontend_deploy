const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const API_BASE_URL = baseUrl;
export const USERS_API_URL = `${baseUrl}/api/users`;
