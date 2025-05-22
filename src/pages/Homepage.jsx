import BrowseEventsCard from '../components/BrowseEventsCard';
import GoCreateEventCard from '../components/GoCreateEventCard';
import InfoCard from '../components/InfoCard';

function Homepage() {
  return (
    <div className="flex flex-col justify-around">
      <InfoCard />
      <div>
        <BrowseEventsCard />
        <GoCreateEventCard />
      </div>
    </div>
  );
}

export default Homepage;
