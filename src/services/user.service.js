import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005',
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getUser = (id) => {
    return this.api.get(`/api/user/${id}`);
  };

  deleteUser = (id) => {
    return this.api.delete(`/api/user/${id}`);
  };
}

const userService = new UserService();

export default userService;
