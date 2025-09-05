import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  // GET /users/:userId
  getUser = (userId) => {
    return this.api.get(`/api/users/${userId}`);
  };

  // DELETE /users/me
  deleteUser = () => {
    // No userId needed in the URL, the backend identifies the user via the token
    return this.api.delete('/api/users/me');
  };
}

const userService = new UserService();

export default userService;
