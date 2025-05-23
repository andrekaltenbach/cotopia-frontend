import { useState } from 'react';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';

export default function UpdateEventCard({ eventId, reload, setReload }) {
  const [formStatus, setFormStatus] = useState(false);

  const apiRequest = (requestBody) => {
    eventService
      .updateEvent(eventId, requestBody)
      .then((response) => {
        console.log(response.data);
        setFormStatus(false);
        reload ? setReload(false) : setReload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      {formStatus ? (
        <EventInputCard apiRequest={apiRequest} />
      ) : (
        <div>
          <h1>edit event</h1>
          <button
            onClick={() => {
              setFormStatus(true);
            }}
            className="btn btn-primary"
          >
            edit event
          </button>
        </div>
      )}
    </div>
  );
}
