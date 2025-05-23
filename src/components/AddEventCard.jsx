import { useState } from 'react';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';
import { useNavigate } from 'react-router-dom';

export default function AddEventCard({ reload, setReload }) {
  const [formStatus, setFormStatus] = useState(false);

  const navigate = useNavigate();

  const apiRequest = (requestBody) => {
    eventService
      .createEvent(requestBody)
      .then((response) => {
        setFormStatus(false);
        // navigate('/events');
        reload ? setReload(false) : setReload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      {formStatus ? (
        <EventInputCard setFormStatus={setFormStatus} apiRequest={apiRequest} />
      ) : (
        <div>
          <h1>create your event</h1>
          <button
            onClick={() => {
              setFormStatus(true);
            }}
            className="btn btn-primary"
          >
            create event
          </button>
        </div>
      )}
    </div>
  );
}
