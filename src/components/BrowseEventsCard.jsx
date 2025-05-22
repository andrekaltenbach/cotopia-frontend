import { Link } from 'react-router-dom';

function BrowseEventsCard() {
  return (
    <div className="card">
      <p>Browse events</p>
      <Link to="/events">
        <button className="btn btn-primary">Browse Events</button>
      </Link>
    </div>
  );
}

export default BrowseEventsCard;
