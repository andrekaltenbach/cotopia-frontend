import { useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import { ImageIcon } from '@phosphor-icons/react';

export default function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  const getEvent = () => {
    eventService
      .getEvent(eventId)
      .then((response) => setEvent(response.data))
      .catch((err) => console.log('error: ', err));
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (!event) {
    return <p>Loading...</p>;
  }

  return <EventCard event={event} />;
}
