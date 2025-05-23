import { useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import UpdateEventCard from '../components/UpdateEventCard';

export default function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const [reload, setReload] = useState(false);
  const { eventId } = useParams();

  const getEvent = () => {
    eventService
      .getEvent(eventId)
      .then((response) => setEvent(response.data))
      .catch((err) => console.log('error: ', err));
  };

  useEffect(() => {
    getEvent();
  }, [reload]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventCard event={event} />
      <UpdateEventCard eventId={eventId} reload={reload} setReload={setReload} />
    </div>
  );
}
