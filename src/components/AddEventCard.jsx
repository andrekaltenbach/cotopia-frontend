import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';
import IsPrivat from './IsPrivat';
import { AuthContext } from '../context/auth.context';
import { toast } from 'react-toastify';

export default function AddEventCard({ onEventCreated }) {
  const [formStatus, setFormStatus] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const apiRequest = async (requestBody) => {
    console.log('Submitting event data:', requestBody);
    try {
      await eventService.createEvent(requestBody);
      setFormStatus(false);
      toast.success('Event created successfully!');
      onEventCreated();
    } catch (err) {
      console.error('Failed to create event:', err);
      const errorMessage =
        err.response?.data?.message || 'Failed to create event. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="card text-center max-w-3xl">
      {formStatus ? (
        <IsPrivat>
          <EventInputCard setFormStatus={setFormStatus} apiRequest={apiRequest} />
        </IsPrivat>
      ) : (
        <div>
          <h2 className="mb-3">Post Your Event</h2>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setFormStatus(true);
              }}
              className="btn btn-primary"
            >
              create event
            </button>
          ) : (
            <button
              onClick={() => navigate('/login', { state: { from: location } })}
              className="btn btn-secondary"
            >
              Login to create event
            </button>
          )}
        </div>
      )}
    </div>
  );
}
