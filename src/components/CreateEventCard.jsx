import { Link } from 'react-router-dom';

export default function CreateEventCard() {
  return (
    <div className="card">
      <p>Create your event</p>
      <Link to="/events/create">
        <button className="btn btn-primary">create event</button>
      </Link>
    </div>
  );
}
