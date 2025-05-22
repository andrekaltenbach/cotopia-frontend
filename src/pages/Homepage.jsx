import BrowseEventsCard from '../components/BrowseEventsCard';
import CreateEventCard from '../components/CreateEventCard';
import InfoCard from '../components/InfoCard';

function Homepage() {
  return (
    <div className="flex flex-col justify-around">
      <InfoCard />
      <div>
        <BrowseEventsCard />
        <CreateEventCard />
      </div>
    </div>
  );
}

export default Homepage;
