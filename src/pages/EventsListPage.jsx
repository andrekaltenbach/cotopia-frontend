import { useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { ImageIcon } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import AddEventCard from '../components/AddEventCard';
import { toast } from 'react-toastify';

function EventsListPage() {
  const [events, setEvents] = useState(null);
  const [reload, setReload] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');

    const query = {};
    if (category) query.category = category;

    eventService
      .getAllEvents(query)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log('error: ', err);
        toast.error('error: failed to load events');
      });
  }, [location.search, reload]);

  if (!events) {
    return <div className="loader mx-auto my-55"></div>;
  }

  return (
    <div>
      <AddEventCard reload={reload} setReload={setReload} />
      <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:flex-wrap sm:gap-5">
        {events
          .map((event, i) => {
            return (
              <Link to={`/events/${event._id}`} key={i}>
                <div className="card flex flex-col gap-4 w-80">
                  {event.typeOfEvent === 'request' && (
                    <div className="absolute w-15 triangle bg-orange-600 text-white font-bold text-sm rounded-tl-lg">
                      <p className="absolute top-3 -left-1 -rotate-45">request</p>
                    </div>
                  )}

                  {event.typeOfEvent === 'offer' && (
                    <div className="absolute w-15 triangle bg-teal-600 text-white font-bold text-sm rounded-tl-lg">
                      <p className="absolute top-3 left-1 -rotate-45">offer</p>
                    </div>
                  )}

                  <div className="flex flex-col justify-center items-center">
                    {event.image ? (
                      <img src={event.image} alt="event image" />
                    ) : (
                      <ImageIcon size={140} weight="thin" />
                    )}
                    <div className="pt-4">
                      <h1>{event.title}</h1>
                      <p>{event.description.substring(0, 30)}...</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default EventsListPage;
