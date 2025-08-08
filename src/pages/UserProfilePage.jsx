import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { AuthContext } from '../context/auth.context';

export default function UserProfilePage() {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

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

  return (
    <>
      <h1>{`Hello User ${user._id}, you're on your profile page`}</h1>
      <div>
        <p>{userData.email}</p>
        <p>{userData.name}</p>
      </div>
    </>
  );
}
