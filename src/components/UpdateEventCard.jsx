import { useState } from 'react';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';
import { AuthContext } from '../context/auth.content';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import IsPrivat from './IsPrivat';

export default function UpdateEventCard({ eventId, reload, setReload }) {
  const [formStatus, setFormStatus] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const apiRequest = (requestBody) => {
    eventService
      .updateEvent(eventId, requestBody)
      .then((response) => {
        console.log(response.data);
        toast.success('event update successful');
        setFormStatus(false);
        reload ? setReload(false) : setReload(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error('error: failed to update event');
      });
  };

  return (
    <div className="card">
      {formStatus ? (
        <IsPrivat>
          <EventInputCard apiRequest={apiRequest} />
        </IsPrivat>
      ) : (
        <div>
          <h1>edit event</h1>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setFormStatus(true);
              }}
              className="btn btn-primary"
            >
              edit event
            </button>
          ) : (
            <button
              onClick={() => {
                setFormStatus(true);
              }}
              className="btn btn-secondary"
            >
              login to edit event
            </button>
          )}
        </div>
      )}
    </div>
  );
}
