import { useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';

export default function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const [reload, setReload] = useState(false);
  const { eventId } = useParams();

  const getEvent = () => {
    eventService
      .getEvent(eventId)
      .then((response) => setEvent(response.data))
      .catch((err) => {
        console.log('error: ', err);
        toast.error('error: failed to load event');
      });
  };

  useEffect(() => {
    getEvent();
  }, [reload]);

  if (!event) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <EventCard event={event} reload={reload} setReload={setReload} />
    </div>
  );
}
