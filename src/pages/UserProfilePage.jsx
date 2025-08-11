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
    <>
      <h1>{`Hello ${user.name}`}</h1>
      <div>
        <h2>Your Data</h2>
        <p>{userData.email}</p>
        <p>{userData._id}</p>
      </div>
      <div>
        <UserPosts />
      </div>
      <div className="mt-10">
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
    </>
  );
}
