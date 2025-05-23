import { useState } from 'react';
import commentService from '../services/comment.service';

export default function AddComment({ eventId, setFormStatus, reload, setReload }) {
  const [title, setTitle] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleCommentTextInput = (e) => setCommentText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      commentText,
    };

    commentService
      .createComment(eventId, requestBody)
      .then((response) => {
        setFormStatus(false);
        reload ? setReload(false) : setReload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">
            Title <span className="text-red-700">*</span>:
          </label>
          <input type="text" name="title" value={title} onChange={handleTitleInput} />
        </div>
        <div className="form-control">
          <label htmlFor="commentText">
            Comment <span className="text-red-700">*</span>:
          </label>
          <textarea
            type="text"
            name="commentText"
            rows="4"
            cols="50"
            value={commentText}
            onChange={handleCommentTextInput}
          />
        </div>

        {title && commentText ? (
          <button className="btn btn-primary-fill">Save</button>
        ) : (
          <button disabled={true} className="btn btn-disabled">
            Save
          </button>
        )}
        <button
          onClick={() => {
            setFormStatus(false);
          }}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </form>
      <div>
        <span className="text-red-700">*</span> required
      </div>
    </div>
  );
}
