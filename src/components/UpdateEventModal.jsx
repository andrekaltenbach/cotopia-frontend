'use client';

import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { PencilLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import EventInputCard from './EventInputCard';
import eventService from '../services/event.service';
import { toast } from 'react-toastify';

export function UpdateEventModal({ eventId, onEventUpdated }) {
  const [openModal, setOpenModal] = useState(false);
  const [formStatus, setFormStatus] = useState(true);

  function onCloseModal() {
    setOpenModal(false);
  }

  const apiRequest = async (requestBody) => {
    try {
      await eventService.updateEvent(eventId, requestBody);
      toast.success('Event updated successfully!');
      onEventUpdated();
      onCloseModal();
    } catch (err) {
      console.error('Failed to update event:', err);
      const errorMessage =
        err.response?.data?.message || 'Failed to update event. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <PencilLineIcon
        size={32}
        onClick={() => setOpenModal(true)}
        className="cursor-pointer hover:text-teal-600"
      />
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader className="bg-gray-300">
          <span className="text-teal-600 font-bold">Edit Event</span>
        </ModalHeader>
        <ModalBody className="bg-gray-100">
          <EventInputCard setFormStatus={setFormStatus} apiRequest={apiRequest} eventId={eventId} />
        </ModalBody>
      </Modal>
    </>
  );
}
