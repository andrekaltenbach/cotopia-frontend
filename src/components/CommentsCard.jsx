import { useEffect, useState, useContext } from 'react';
import commentService from '../services/comment.service';
import AddComment from './AddComment';
import IsPrivat from './IsPrivat';
import { AuthContext } from '../context/auth.content';

export default function CommentsCard({ eventId }) {
  const [comments, setComments] = useState(null);
  const [formStatus, setFormStatus] = useState(false);
  const [reload, setReload] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const getComments = (id) => {
    commentService
      .getAllComments(id)
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getComments(eventId);
  }, [reload]);

  if (!comments) {
    return <p>Comments Loading...</p>;
  }

  return (
    <div className="border-gray-800">
      <h1>Comments:</h1>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <div className="card" key={comment._id}>
                <h1>{comment.title}</h1>
                <p>{comment.commentText}</p>
                <p>comment by: {comment.createdBy.name}</p>
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
            reload={reload}
            setReload={setReload}
          />
        </IsPrivat>
      ) : (
        <div>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setFormStatus(true);
              }}
              className="btn btn-primary"
            >
              Comment Event
            </button>
          ) : (
            <button
              onClick={() => {
                setFormStatus(true);
              }}
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
