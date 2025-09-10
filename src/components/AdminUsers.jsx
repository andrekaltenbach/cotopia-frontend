import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import adminService from '../services/admin.service';
import { TrashIcon } from '@phosphor-icons/react';
import PopUpModal from './PopUpModal';

export default function AdminUsers() {
  const [users, setUsers] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);

  const getAdminUsers = async () => {
    try {
      const allUsers = await adminService.getAllUsers();
      setUsers(allUsers.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await adminService.deleteUser(userId);
      getAdminUsers();
      setOpenModalId(null);
    } catch (error) {
      console.log('error:', error);
    }
    console.log('user deleted', userId);
    setOpenModalId(null); // close modal after delete
  };

  if (!users) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <>
        <h1>Users</h1>
        <p>No users available</p>
      </>
    );
  }

  return (
    <>
      <h1>Users</h1>
      {users.map((user) => (
        <div
          className="flex flex-col sm:flex-row gap-4 my-3 py-3 border-b border-b-gray-400"
          key={user._id}
        >
          <div className="flex justify-between items-center sm:gap-8 sm:w-full sm:justify-between">
            <div className="flex justify-between w-full sm:w-2/3 mr-6">
              <div className="w-max">
                <h3>User name</h3>
                <p>{user.name}</p>
              </div>
              <div>
                <h3>User email</h3>
                <p>{user.email}</p>
              </div>

              <div>
                <h3>created at</h3>
                <p className="">date: {user.createdAt.split('T')[0]}</p>
                <p className="">time: {user.createdAt.split('T')[1].split('.')[0]}</p>
              </div>
            </div>
            <div>
              <TrashIcon
                size={32}
                className="text-gray-500 cursor-pointer hover:text-red-500 hover:animate-pulse"
                onClick={() => setOpenModalId(user._id)}
              />
              <PopUpModal
                openModal={openModalId === user._id}
                setOpenModal={() => setOpenModalId(null)}
                handlerFunction={() => handleDelete(user._id)}
                message="Are you sure you want to delete your event?"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
