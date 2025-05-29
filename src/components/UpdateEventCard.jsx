import { useEffect, useState } from 'react';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import IsPrivat from './IsPrivat';

export default function UpdateEventCard({ eventId, createdBy, reload, setReload }) {
  const [formStatus, setFormStatus] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

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
    <>
      {user?.name === createdBy?.name && (
        <div className="card text-center">
          {formStatus ? (
            <IsPrivat>
              <EventInputCard
                setFormStatus={setFormStatus}
                apiRequest={apiRequest}
                eventId={eventId}
              />
            </IsPrivat>
          ) : (
            <div>
              <h2 className="mb-3">edit event</h2>
              {isLoggedIn && (
                <button
                  onClick={() => {
                    setFormStatus(true);
                  }}
                  className="btn btn-primary"
                >
                  edit event
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
