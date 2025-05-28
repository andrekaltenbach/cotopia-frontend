import { Link, useNavigate } from 'react-router-dom';
import { ImageIcon, TrashIcon } from '@phosphor-icons/react';
import eventService from '../services/event.service';
import CommentsCard from './CommentsCard';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
// import eventImage from '../assets/images/eventImage.jpg';
// import helpImage from '../assets/images/helpImage.jpg';
// import realEstateImage from '../assets/images/realEstateImage.jpg';
// import tradeImage from '../assets/images/tradeImage.jpg';
// import transportImage from '../assets/images/transportImage.jpg';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const categoryImages = {
    event: '/images/eventImage.jpg',
    help: '/images/helpImage.jpg',
    'real estate': '/images/realEstateImage.jpg',
    trade: '/images/tradeImage.jpg',
    transportation: '/images/transportImage.jpg',
  };

  const handleDelete = () => {
    eventService.deleteEvent(event._id);
    navigate('/events');
  };

  return (
    <div className="card flex flex-col gap-4 text-center max-w-3xl">
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
      <p>{event.category}</p>

      <div>
        {event.image ? (
          <img src={event.image} alt="event image" className="mx-auto" />
        ) : (
          <img
            src={categoryImages[event.category]}
            alt="event image"
            className="mx-auto w-11/12 sm:max-w-2xl"
          />
        )}
      </div>
      <div className="pt-4">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        {event.toLocation ? <p>from: {event.location}</p> : <p>{event.location}</p>}
        {event.toLocation && <p>to: {event.toLocation}</p>}
        <p>{event.eventURL}</p>
        <p>postet by: {event.createdBy.name}</p>
      </div>
      <div className="w-full flex justify-center gap-5">
        {/* <Link to={`/events/${event.category}`}> */}
        <Link to={`/events`}>
          <button className="btn btn-primary">Back</button>
        </Link>
        {isLoggedIn && user.name === event.createdBy.name && (
          <button className="text-gray-500 cursor-pointer" onClick={handleDelete}>
            <TrashIcon size={32} />
          </button>
        )}
      </div>
      <CommentsCard eventId={event._id} />
    </div>
  );
}
