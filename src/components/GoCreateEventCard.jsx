import { Link } from 'react-router-dom';

function GoCreateEventCard() {
  return (
    <div className="card">
      <p>Go and create your event</p>
      <Link to="/events/create">
        <button className="btn btn-primary">create event</button>
      </Link>
    </div>
  );
}

export default GoCreateEventCard;
