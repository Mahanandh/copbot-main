import axios from 'axios';

// Create an Axios instance with base configuration
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5001/api', // Pointing to the Flask backend
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // 15 seconds timeout
});

// Request Interceptor (Optional: For adding tokens in the future)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const CopBotAPI = {
    // Chat / Assistant
    sendMessage: async (message) => {
        try {
            const response = await apiClient.post('/chat/chat', { message });
            return response.data;
        } catch (error) {
            console.error('API Error (Chat):', error);
            throw error;
        }
    },

    // Emergency Contacts
    getEmergencyContacts: async () => {
        try {
            const response = await apiClient.get('/emergency/contacts');
            return response.data;
        } catch (error) {
            console.error('API Error (Emergency):', error);
            throw error;
        }
    },

    // FIR Guidelines
    getFIRGuidelines: async () => {
        try {
            const response = await apiClient.get('/fir/guidelines');
            return response.data;
        } catch (error) {
            console.error('API Error (FIR):', error);
            throw error;
        }
    },

    // Legal Database
    getLegalSections: async () => {
        try {
            const response = await apiClient.get('/legal/sections');
            return response.data;
        } catch (error) {
            console.error('API Error (Legal):', error);
            throw error;
        }
    }
};

export default apiClient;
