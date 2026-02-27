import axios from 'axios';

// Create a robust Axios client
const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30s timeout to allow LLM processing
});

// Global Error Handler via Response Interceptor
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('[API Service Error]', error.message);

        let customMessage = 'System communication failure. Please check your connection.';

        if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status >= 500) {
                customMessage = 'Critical backend failure. AI core is offline.';
            } else if (error.response.data && error.response.data.error) {
                customMessage = error.response.data.error;
            }
        } else if (error.request) {
            // Network error
            customMessage = 'Servers unreachable. Ensure the Flask backend is active.';
        }

        return Promise.reject(new Error(customMessage));
    }
);

// Endpoints Export
export const AI_API = {
    // Send Message to RAG Pipeline
    sendChatMessage: async (message) => {
        // Hitting the updated /api/chat endpoint
        const res = await apiService.post('/chat', { message });
        return res.data;
    },

    // Submit Complaint Payload
    submitComplaint: async (formData) => {
        // Using exactly what the prompt specifies
        const res = await apiService.post('/complaints', formData);
        return res.data;
    }
};

export default apiService;
