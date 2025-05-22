import { Link } from 'react-router-dom';
import { ImageIcon } from '@phosphor-icons/react';

export default function EventCard({ event }) {
  return (
    <div className="card flex gap-4">
      {event.image ? (
        <img src={event.image} alt="event image" />
      ) : (
        <ImageIcon size={140} weight="duotone" />
      )}
      <div className="pt-4">
        <h1>{event.title}</h1>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <p>Category: {event.category}</p>
        {event.toLocation && <p>Category: {event.category}</p>}
        <p>{event.eventURL}</p>
        <p>postet by: {event.createdBy.name}</p>
      </div>
      {/* <Link to={`/events/${event.category}`}> */}
      <Link to={`/events`}>
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
}
