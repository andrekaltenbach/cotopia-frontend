import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon } from '@phosphor-icons/react';
import eventService from '../services/event.service';
import CommentsCard from './CommentsCard';
import { AuthContext } from '../context/auth.context';
import { useContext, useState } from 'react';
import PopUpModal from './PopUpModal';
import { toast } from 'react-toastify';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);

  const categoryImages = {
    event: '/images/eventImage.jpg',
    help: '/images/helpImage.jpg',
    'real estate': '/images/realEstateImage.jpg',
    trade: '/images/tradeImage.jpg',
    transportation: '/images/transportImage.jpg',
  };

  const handleDelete = () => {
    eventService
      .deleteEvent(event._id)
      .then((response) => {
        console.log('Event deleted');
        toast.success('event deleted');
        navigate('/');
      })
      .catch((err) => {
        console.log('error: ', err);
        toast.error('error: failed to delete event');
      });
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
        {event.createdBy?.name ? (
          <p>created by: {event.createdBy.name}</p>
        ) : (
          <p>
            created by: <span className="italic">user deleted</span>
          </p>
        )}
      </div>
      <div className="w-full flex justify-center gap-5">
        {/* <Link to={`/events/${event.category}`}> */}
        <Link to={`/events`}>
          <button className="btn btn-primary">Back</button>
        </Link>
        {isLoggedIn && user.name === event.createdBy?.name && (
          <>
            <button className="text-gray-500 cursor-pointer" onClick={() => setOpenModal(true)}>
              <TrashIcon size={32} />
            </button>
            <PopUpModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              handlerFunction={handleDelete}
              message="Are you sure you want to delete your event?"
            />
          </>
        )}
      </div>
      <CommentsCard eventId={event._id} />
    </div>
  );
}
