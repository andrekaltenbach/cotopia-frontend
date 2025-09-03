'use client';

import { WarningIcon } from '@phosphor-icons/react';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';

export default function PopUpModal({ openModal, setOpenModal, handlerFunction, message }) {
  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader className="bg-gray-300">
          <span className="text-red-700 font-bold">WARNING</span>
        </ModalHeader>
        <ModalBody className="bg-gray-100">
          <div className="text-center">
            <WarningIcon size={40} className="text-red-700 mx-auto my-2" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                onClick={() => {
                  setOpenModal(false);
                  handlerFunction();
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
