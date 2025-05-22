import { useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { ImageIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function EventsListPage() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, []);

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        {events.map((event, i) => {
          return (
            <Link to={`/events/${event._id}`} key={i}>
              <div className="card flex gap-4">
                {event.image ? (
                  <img src={event.image} alt="event image" />
                ) : (
                  <ImageIcon size={140} weight="duotone" />
                )}
                <div className="pt-4">
                  <h1>{event.title}</h1>
                  <p>{event.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EventsListPage;
