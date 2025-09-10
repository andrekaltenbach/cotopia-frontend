import axios from 'axios';

class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005',
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getAllEvents = (query = {}) => {
    return this.api.get(`/api/admin/events`, { params: query });
  };

  deleteEvent = (eventId) => {
    return this.api.delete(`/api/admin/events/${eventId}`);
  };

  getAllComments = (query = {}) => {
    return this.api.get(`/api/admin/comments`, { params: query });
  };

  deleteComment = (eventId, commentId) => {
    return this.api.delete(`/api/admin/events/${eventId}/comments/${commentId}`);
  };

  getAllUsers = () => {
    return this.api.get(`/api/admin/users`);
  };

  deleteUser = (userId) => {
    return this.api.delete(`/api/admin/users/${userId}`);
  };
}

const adminService = new AdminService();

export default adminService;
