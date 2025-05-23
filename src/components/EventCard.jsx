import { Link, useNavigate } from 'react-router-dom';
import { ImageIcon } from '@phosphor-icons/react';
import eventService from '../services/event.service';
import CommentsCard from './CommentsCard';

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    eventService.deleteEvent(event._id);
    navigate('/events');
  };

  return (
    <div className="card flex flex-col gap-4">
      <div>
        {event.image ? (
          <img src={event.image} alt="event image" className="mx-auto" />
        ) : (
          <ImageIcon size={140} weight="duotone" className="mx-auto" />
        )}
      </div>
      <div className="pt-4">
        <h1>{event.title}</h1>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <p>Category: {event.category}</p>
        {event.toLocation && <p>Category: {event.category}</p>}
        <p>{event.eventURL}</p>
        <p>postet by: {event.createdBy.name}</p>
      </div>
      <div>
        {/* <Link to={`/events/${event.category}`}> */}
        <Link to={`/events`}>
          <button className="btn btn-primary">Back</button>
        </Link>
        <button className="btn btn-secondary" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <CommentsCard eventId={event._id} />
    </div>
  );
}
