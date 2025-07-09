import { useState } from 'react';
import commentService from '../services/comment.service';
import { toast } from 'react-toastify';
import { PopUp } from './PopUp';

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
        toast.success('add comment successful');
        reload ? setReload(false) : setReload(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error('error: failed to add comment');
      });
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
        <div>
          <span className="text-red-700">*</span> required
        </div>

        <div className="text-center mt-8">
          {title && commentText ? (
            <button className="btn btn-comment">Save</button>
          ) : (
            <PopUp>
              <button disabled={true} className="btn btn-disabled w-30">
                Save
              </button>
            </PopUp>
          )}
          <button
            onClick={() => {
              setFormStatus(false);
            }}
            className="btn btn-secondary ml-5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
