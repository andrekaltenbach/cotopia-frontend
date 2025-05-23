import { useState } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/event.service';

export default function AddEventCard() {
  const [createStatus, setCreateStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [typeOfEvent, setTypeOfEvent] = useState('');
  const [location, setLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [image, setImage] = useState('');

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handleCategoryInput = (e) => setCategory(e.target.value);
  const handleTypeOfEventInput = (e) => setTypeOfEvent(e.target.value);
  const handleLocationInput = (e) => setLocation(e.target.value);
  const handleToLocationInput = (e) => setToLocation(e.target.value);
  const handleImageInput = (e) => setImage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      category,
      typeOfEvent,
      location,
      toLocation,
      image,
    };

    eventService
      .createEvent(requestBody)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));

    setCreateStatus(false);
    console.log('Submit Event');
  };

  return (
    <div className="card">
      {createStatus ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">
                Title <span className="text-red-700">*</span>:
              </label>
              <input type="text" name="title" value={title} onChange={handleTitleInput} />
            </div>
            <div className="form-control">
              <label htmlFor="description">
                Description <span className="text-red-700">*</span>:
              </label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionInput}
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">
                Category <span className="text-red-700">*</span>:
              </label>
              <select
                name="category"
                value={category}
                onChange={handleCategoryInput}
                required={true}
                className="h-10 border-1 rounded-lg"
              >
                <option disabled={true} value="">
                  select...
                </option>
                <option value="event">Event</option>
                <option value="help">Help</option>
                <option value="real estate">Real Estate</option>
                <option value="trade">Trade</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="typeOfEvent">
                Type <span className="text-red-700">*</span>:
              </label>
              <select
                name="typeOfEvent"
                value={typeOfEvent}
                onChange={handleTypeOfEventInput}
                required={true}
                className="h-10 border-1 rounded-lg"
              >
                <option disabled={true} value="">
                  select...
                </option>
                <option value="request">Request</option>
                <option value="offer">Offer</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="location">
                Location <span className="text-red-700">*</span>:
              </label>
              <input type="text" name="location" value={location} onChange={handleLocationInput} />
            </div>
            <div className="form-control">
              <label htmlFor="toLocation">Destination:</label>
              <input
                type="text"
                name="toLocation"
                value={toLocation}
                onChange={handleToLocationInput}
              />
            </div>
            <div className="form-control">
              <label htmlFor="image">Image URL:</label>
              <input type="text" name="image" value={image} onChange={handleImageInput} />
            </div>
            {title && description && category && typeOfEvent && location ? (
              <button className="btn btn-primary-fill">Save</button>
            ) : (
              <button disabled={true} className="btn btn-disabled">
                Save
              </button>
            )}
            <Link to="/">
              <button
                onClick={() => {
                  setCreateStatus(false);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </Link>
          </form>
        </div>
      ) : (
        <div>
          <h1>create your event</h1>
          <button
            onClick={() => {
              setCreateStatus(true);
            }}
            className="btn btn-primary"
          >
            create event
          </button>
        </div>
      )}
      <div>
        <span className="text-red-700">*</span> required
      </div>
    </div>
  );
}
