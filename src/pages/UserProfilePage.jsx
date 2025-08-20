import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { AuthContext } from '../context/auth.context';
import PopUpModal from '../components/PopUpModal';
import UserPosts from '../components/UserPosts';

export default function UserProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUser(user._id)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log('error :', err);
        toast.error('error: failed to load user data');
      });
  }, []);

  if (!userData) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  const handleDelete = () => {
    userService
      .deleteUser(user._id)
      .then((response) => {
        console.log('User account deleted', response.data);
        toast.success('User account deleted');
        logOutUser();
        navigate('/');
      })
      .catch((err) => {
        console.log('error: ', err);
        toast.error('error: failed to delete user account');
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="mx-auto mt-10">{`Hello ${user.name}`}</h1>
      <div>
        <h2>Your Data</h2>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
      </div>
      <div>
        <UserPosts />
      </div>
      <div className="mt-10 py-10 border-t flex justify-end">
        <div onClick={() => setOpenModal(true)} className="cursor-pointer text-red-700 w-fit">
          Delete Account
        </div>
        <PopUpModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handlerFunction={handleDelete}
          message="Are you sure you want to delete your account?"
        />
      </div>{' '}
    </div>
  );
}
