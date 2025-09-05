import { useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { Link, useLocation } from 'react-router-dom';
import AddEventCard from '../components/AddEventCard';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';

function EventsListPage() {
  const [events, setEvents] = useState(null);
  const location = useLocation();

  const categoryImages = {
    event: '/images/eventImage.jpg',
    help: '/images/helpImage.jpg',
    'real estate': '/images/realEstateImage.jpg',
    trade: '/images/tradeImage.jpg',
    transportation: '/images/transportImage.jpg',
  };

  const fetchEvents = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get('category');
      const query = {};
      if (category) query.category = category;

      const response = await eventService.getAllEvents(query);
      setEvents(response.data);
    } catch (err) {
      console.log('error: ', err);
      toast.error('error: failed to load events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [location.search]);

  if (!events) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
    // return <div className="loader mx-auto my-55"></div>;
  }

  return (
    <div>
      <AddEventCard onEventCreated={fetchEvents} />
      <div className="flex flex-col justify-center items-center mx-auto sm:flex-row sm:justify-center sm:max-w-7xl sm:flex-wrap sm:gap-5">
        {events
          .map((event, i) => {
            return (
              <Link to={`/events/${event._id}`} key={i}>
                <div className="card flex flex-col gap-4 w-80 h-90">
                  {event.typeOfEvent === 'request' && (
                    <div className="absolute w-15 triangle bg-yellow-700 text-white font-bold text-sm rounded-tl-lg">
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
                      <img
                        src={event.image}
                        alt="event image"
                        className="w-full h-52 object-cover rounded-t-2xl sm:w-lg"
                      />
                    ) : (
                      <img
                        src={categoryImages[event.category]}
                        alt="event image"
                        className="mx-auto w-full rounded-t-2xl sm:w-lg"
                      />
                    )}
                    <div className="pt-4">
                      {event.title.length > 60 ? (
                        <h2 className="mb-2">{event.title.substring(0, 60)}...</h2>
                      ) : (
                        <h2 className="mb-2">{event.title}</h2>
                      )}
                      {event.description.length > 60 ? (
                        <p>{event.description.substring(0, 60)}...</p>
                      ) : (
                        <p>{event.description}</p>
                      )}
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
