import { useEffect, useState, useContext } from 'react';
import commentService from '../services/comment.service';
import AddComment from './AddComment';
import IsPrivat from './IsPrivat';
import { AuthContext } from '../context/auth.context';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CommentsCard({ eventId }) {
  const [comments, setComments] = useState(null);
  const [formStatus, setFormStatus] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getComments = async (id) => {
    try {
      const response = await commentService.getAllComments(id);
      setComments(response.data);
    } catch (err) {
      console.log(err);
      toast.error('error: failed to load comments');
    }
  };

  useEffect(() => {
    getComments(eventId);
  }, [eventId]);

  if (!comments) {
    return <p>Comments Loading...</p>;
  }

  return (
    <div className="text-center my-5 w-11/12 mx-auto">
      <h2 className="font-bold my-8">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <div className="card text-center max-w-4/5" key={comment._id}>
                <h2 className="mb-2">{comment.title}</h2>
                <p className="mb-2">{comment.commentText}</p>
                {comment.createdBy?.name ? (
                  <p>comment by: {comment.createdBy.name}</p>
                ) : (
                  <p>
                    comment by: <span className="italic">user deleted</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
      {formStatus ? (
        <IsPrivat>
          <AddComment
            eventId={eventId}
            setFormStatus={setFormStatus}
            onCommentAdded={getComments}
          />
        </IsPrivat>
      ) : (
        <div className="text-center my-8">
          {isLoggedIn ? (
            <button onClick={() => setFormStatus(true)} className="btn btn-comment">
              Comment Event
            </button>
          ) : (
            <button
              onClick={() => navigate('/login', { state: { from: location } })}
              className="btn btn-secondary"
            >
              login to comment event
            </button>
          )}
        </div>
      )}
    </div>
  );
}
