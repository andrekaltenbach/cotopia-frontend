import { useEffect, useState } from 'react';
import commentService from '../services/comment.service';

export default function CommentsCard({ eventId }) {
  const [comments, setComments] = useState(null);
  const getComments = (id) => {
    commentService
      .getAllComments(id)
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getComments(eventId);
  }, []);

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
              <div>
                <h1>{comment.title}</h1>
                <p>{comment.commentText}</p>
                <p>{comment.createdBy}</p>
              </div>
            );
          })}
        </div>
      )}
      <button className="btn btn-primary">Comment Event</button>
    </div>
  );
}
