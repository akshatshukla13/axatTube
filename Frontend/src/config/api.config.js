// Centralized API Configuration
// Uses environment variable or defaults to local backend

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default API_BASE_URL;
