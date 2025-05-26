import { Link } from 'react-router-dom';

function BrowseEventsCard() {
  return (
    <div className="card">
      <p>Browse by category</p>
      <div className="flex flex-col justify-center items-center border-t pt-5">
        <Link to="/events?category=event" className=" w-fit hover:text-teal-800 hover:font-bold">
          {/* <button className="btn btn-primary">Browse Events</button> */}
          Events
        </Link>
        <Link to="/events?category=help" className=" w-fit hover:text-teal-800 hover:font-bold">
          Help
        </Link>
        <Link
          to="/events?category=real estate"
          className=" w-fit hover:text-teal-800 hover:font-bold"
        >
          Real Estate
        </Link>
        <Link to="/events?category=trade" className=" w-fit hover:text-teal-800 hover:font-bold">
          Trade
        </Link>
        <Link
          to="/events?category=transportation"
          className=" w-fit hover:text-teal-800 hover:font-bold"
        >
          Transportation
        </Link>
        {/* <Link to="/events">
        Jobs
      </Link> */}
      </div>
    </div>
  );
}

export default BrowseEventsCard;
