import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/event.service';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { AuthContext } from '../context/auth.context';
import PopUpModal from '../components/PopUpModal';
import UserPosts from '../components/UserPosts';

export default function UserProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [userPosts, setUserPosts] = useState(null);
  const navigate = useNavigate();

  const fetchUserPosts = async () => {
    if (!user?._id) return;
    try {
      const query = { createdBy: user._id };
      const response = await eventService.getAllEvents(query);
      setUserPosts(response.data);
    } catch (err) {
      console.log('err: ', err);
      toast.error('error: failed to load user posts');
    }
  };

  // Fetch posts when the component mounts or user changes
  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  // The `user` object from AuthContext is our single source of truth.
  // The `IsPrivat` route guard should ensure this component doesn't render
  // until the user is loaded, so this check acts as a final safeguard.
  if (!user) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUser();
      toast.success('User account deleted');
      logOutUser();
      navigate('/');
    } catch (err) {
      console.log('error: ', err);
      toast.error('error: failed to delete user account');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="mx-auto mt-10">{`Hello ${user.name}`}</h1>
      <div>
        <h2>Your Data</h2>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div>
        <UserPosts userPosts={userPosts} />
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
