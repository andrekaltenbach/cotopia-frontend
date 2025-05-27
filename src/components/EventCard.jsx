import { Link, useNavigate } from 'react-router-dom';
import { ImageIcon, TrashIcon } from '@phosphor-icons/react';
import eventService from '../services/event.service';
import CommentsCard from './CommentsCard';
import { AuthContext } from '../context/auth.content';
import { useContext } from 'react';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleDelete = () => {
    eventService.deleteEvent(event._id);
    navigate('/events');
  };

  return (
    <div className="card flex flex-col gap-4 text-center w-full">
      {event.typeOfEvent === 'request' && (
        <div className=" w-full bg-orange-600 text-white font-bold text-xl rounded-t-lg">
          <p className="">request</p>
        </div>
      )}
      {event.typeOfEvent === 'offer' && (
        <div className=" w-full bg-teal-600 text-white font-bold text-xl rounded-t-lg">
          <p className="">offer</p>
        </div>
      )}
      {/* {event.typeOfEvent === 'request' && (
        <div className="absolute w-25 triangle bg-orange-600 text-white font-bold text-xl rounded-tl-lg">
          <p className="absolute top-6 left-0 -rotate-45">request</p>
        </div>
      )} */}

      <div>
        {event.image ? (
          <img src={event.image} alt="event image" className="mx-auto" />
        ) : (
          <div className="border w-60 rounded-2xl flex flex-col justify-center mx-auto">
            <ImageIcon size={140} weight="thin" className="mx-auto" />
            <p>Image not available</p>
          </div>
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
      <div className="w-full flex justify-center gap-5">
        {/* <Link to={`/events/${event.category}`}> */}
        <Link to={`/events`}>
          <button className="btn btn-primary">Back</button>
        </Link>
        {isLoggedIn && (
          <button className="text-gray-500 cursor-pointer" onClick={handleDelete}>
            <TrashIcon size={32} />
          </button>
        )}
      </div>
      <CommentsCard eventId={event._id} />
    </div>
  );
}
