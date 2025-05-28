import axios from 'axios';

class CommentService {
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

  createComment = (id, requestBody) => {
    return this.api.post(`/api/events/${id}/comments`, requestBody);
  };

  getAllComments = (id) => {
    return this.api.get(`/api/events/${id}/comments`);
  };
}

const commentService = new CommentService();

export default commentService;
