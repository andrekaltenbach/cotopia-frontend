import axios from 'axios';

class EventService {
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

  createEvent = (requestBody) => {
    return this.api.post('api/events', requestBody);
  };

  getAllEvents = (query = {}) => {
    return this.api.get(`api/events`, { params: query });
  };

  getEvent = (id) => {
    return this.api.get(`api/events/${id}`);
  };

  updateEvent = (id, requestBody) => {
    return this.api.put(`/api/events/${id}`, requestBody);
  };

  deleteEvent = (id) => {
    return this.api.delete(`/api/events/${id}`);
  };
}

const eventService = new EventService();

export default eventService;
