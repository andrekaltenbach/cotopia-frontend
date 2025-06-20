import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';
import IsPrivat from './IsPrivat';
import { AuthContext } from '../context/auth.context';
import { toast } from 'react-toastify';

export default function AddEventCard({ reload, setReload }) {
  const [formStatus, setFormStatus] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const apiRequest = (requestBody) => {
    eventService
      .createEvent(requestBody)
      .then((response) => {
        setFormStatus(false);
        toast.success('add event successful');

        // navigate('/events');
        reload ? setReload(false) : setReload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card text-center max-w-3xl">
      {formStatus ? (
        <IsPrivat>
          <EventInputCard setFormStatus={setFormStatus} apiRequest={apiRequest} />
        </IsPrivat>
      ) : (
        <div>
          <h2 className="mb-3">create your event</h2>
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
              onClick={() => {
                setFormStatus(true);
              }}
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
