import { useContext, useEffect, useState } from 'react';
import eventService from '../services/event.service';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

export default function UserPosts() {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const query = { createdBy: user._id };

    eventService
      .getAllEvents(query)
      .then((response) => setUserPosts(response.data))
      .catch((err) => {
        console.log('err: ', err);
        toast.error('error: failed to load user posts');
      });
  }, [user]);

  if (!userPosts) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <>
      <h2>Your Posts</h2>
      {userPosts.map((post) => {
        return (
          <Link to={`/events/${post._id}`}>
            <div key={post._id}>
              <p>{post.title}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
