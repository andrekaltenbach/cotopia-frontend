import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import adminService from '../services/admin.service';
import { TrashIcon } from '@phosphor-icons/react';
import PopUpModal from './PopUpModal';

export default function AdminEvents() {
  const [events, setEvents] = useState(null);
  const [openModalId, setOpenModalId] = useState(null); // stores event._id or null

  const getAdminEvents = async () => {
    try {
      const allEvents = await adminService.getAllEvents();
      setEvents(allEvents.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAdminEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await adminService.deleteEvent(eventId);
      getAdminEvents();
      setOpenModalId(null);
    } catch (error) {
      console.log('error:', error);
    }
    console.log('post deleted', eventId);
    setOpenModalId(null); // close modal after delete
  };

  if (!events) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  if (Array.isArray(events) && events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <>
      <h1>Events</h1>
      {events.map((event) => (
        <div
          className="flex flex-col sm:flex-row gap-4 py-3 border-b border-b-gray-400"
          key={event._id}
        >
          <div className="sm:w-full break-words">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
          <div className="flex justify-between items-center sm:gap-8 sm:w-1/2 sm:justify-end">
            <div className="flex justify-between w-2/3 sm:w-full sm:pr-5">
              <div>
                <h3>created by</h3>
                <p>{event.createdBy.name}</p>
                <p>{event.createdBy.email}</p>
              </div>
              <div>
                <h3>created at</h3>
                <p className="">date: {event.createdAt.split('T')[0]}</p>
                <p className="">time: {event.createdAt.split('T')[1].split('.')[0]}</p>
              </div>
            </div>
            <div>
              <TrashIcon
                size={32}
                className="text-gray-500 cursor-pointer hover:text-red-500 hover:animate-pulse"
                onClick={() => setOpenModalId(event._id)}
              />
              <PopUpModal
                openModal={openModalId === event._id}
                setOpenModal={() => setOpenModalId(null)}
                handlerFunction={() => handleDelete(event._id)}
                message="Are you sure you want to delete your event?"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
