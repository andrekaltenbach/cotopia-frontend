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
      <div>
        {event.typeOfEvent === 'request' && (
          <div className=" w-full bg-orange-600 rounded-t-lg">
            <h2 className="">request</h2>
          </div>
        )}
        {event.typeOfEvent === 'offer' && (
          <div className=" w-full bg-teal-600 rounded-t-lg">
            <h2 className="">offer</h2>
          </div>
        )}
      </div>
      <div>
        {event.image ? (
          <img src={event.image} alt="event image" className="mx-auto w-11/12 sm:max-w-2xl" />
        ) : (
          <img
            src={categoryImages[event.category]}
            alt="event image"
            className="mx-auto w-11/12 sm:max-w-2xl"
          />
        )}
      </div>
      <div className="pt-4 pb-2">
        <h2 className="mb-2">{event.title}</h2>
        <p className="mb-2">{event.description}</p>
        {event.toLocation ? (
          <p className="mb-2">from: {event.location}</p>
        ) : (
          <p className="mb-2">{event.location}</p>
        )}
        {event.toLocation && <p className="mb-2">to: {event.toLocation}</p>}
        <p>{event.eventURL}</p>
        {event.createdBy?.name ? (
          <p>created by: {event.createdBy.name}</p>
        ) : (
          <p>
            created by: <span className="italic">user deleted</span>
          </p>
        )}
      </div>
      <div className="w-full flex justify-center items-center gap-5">
        {/* <Link to={`/events/${event.category}`}> */}
        <Link to={`/events`} className="my-3">
          <button className="btn btn-primary">Back</button>
        </Link>
        {isLoggedIn && user.name === event.createdBy?.name && (
          <div>
            <button className="text-gray-500 cursor-pointer" onClick={() => setOpenModal(true)}>
              <TrashIcon size={32} />
            </button>
            <PopUpModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              handlerFunction={handleDelete}
              message="Are you sure you want to delete your event?"
            />
          </div>
        )}
      </div>
      <CommentsCard eventId={event._id} />
    </div>
  );
}
