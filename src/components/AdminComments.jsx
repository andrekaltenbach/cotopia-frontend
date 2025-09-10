import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import adminService from '../services/admin.service';
import { TrashIcon } from '@phosphor-icons/react';
import PopUpModal from './PopUpModal';

export default function AdminComments() {
  const [comments, setComments] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);

  const getAdminComments = async (query) => {
    try {
      const allComments = await adminService.getAllComments(query);
      setComments(allComments.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAdminComments();
  }, []);

  const handleDelete = async (eventId, commentId) => {
    try {
      await adminService.deleteComment(eventId, commentId);
      getAdminComments();
      setOpenModalId(null);
    } catch (error) {
      console.log('error:', error);
    }
    console.log('comment deleted', commentId);
    setOpenModalId(null); // close modal after delete
  };

  if (!comments) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <>
        <h1>Comments</h1>
        <p>No comments available</p>
      </>
    );
  }

  return (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <div
          className="flex flex-col sm:flex-row gap-4 my-3 py-3 border-b border-b-gray-400"
          key={comment._id}
        >
          <div className="sm:w-full break-words">
            <h3>{comment.title}</h3>
            <p>{comment.commentText}</p>
          </div>
          <div className="flex justify-between items-center sm:gap-8 sm:w-1/2 sm:justify-end">
            <div className="flex justify-between w-2/3 sm:w-full sm:pr-5">
              <div>
                <h3>created by</h3>
                <p>{comment.createdBy.name}</p>
                <p>{comment.createdBy.email}</p>
              </div>
              <div>
                <h3>created at</h3>
                <p className="">date: {comment.createdAt.split('T')[0]}</p>
                <p className="">time: {comment.createdAt.split('T')[1].split('.')[0]}</p>
              </div>
            </div>
            <div>
              <TrashIcon
                size={32}
                className="text-gray-500 cursor-pointer hover:text-red-500 hover:animate-pulse"
                onClick={() => setOpenModalId(comment._id)}
              />
              <PopUpModal
                openModal={openModalId === comment._id}
                setOpenModal={() => setOpenModalId(null)}
                handlerFunction={() => handleDelete(comment.event._id, comment._id)}
                message="Are you sure you want to delete your event?"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
