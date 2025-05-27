import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/event.service';
import { toast } from 'react-toastify';

export default function EventInputCard({ setFormStatus, apiRequest, eventId }) {
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

  if (eventId) {
    useEffect(() => {
      eventService
        .getEvent(eventId)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCategory(response.data.category);
          setTypeOfEvent(response.data.typeOfEvent);
          setLocation(response.data.location);
          setToLocation(response.data.toLocation);
          setImage(response.data.image);
        })
        .catch((err) => {
          console.log(err);
          toast.error('error: failed to get event data');
        });
    }, []);
  }
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

    apiRequest(requestBody);
  };

  return (
    <div>
      <h1 className="w-full text-center font-bold">Create new event</h1>
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
          <textarea
            type="text"
            name="description"
            rows="4"
            cols="50"
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
            className="h-10 border-1 rounded-lg bg-white"
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
            className="h-10 border-1 rounded-lg bg-white"
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
        <div className="w-full mt-3 text-sm">
          <span className="text-red-700">*</span> required
        </div>
        <div className="text-center mt-8">
          {title && description && category && typeOfEvent && location ? (
            <button className="btn btn-primary-fill w-30">Save</button>
          ) : (
            <button disabled={true} className="btn btn-disabled w-30">
              Save
            </button>
          )}
          <Link to="/">
            <button
              onClick={() => {
                setFormStatus(false);
              }}
              className="btn btn-secondary ml-5"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
