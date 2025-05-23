import BrowseEventsCard from '../components/BrowseEventsCard';
import AddEventCard from '../components/AddEventCard';
import InfoCard from '../components/InfoCard';

function Homepage() {
  return (
    <div className="flex flex-col justify-around">
      <InfoCard />
      <div>
        <BrowseEventsCard />
        <AddEventCard />
      </div>
    </div>
  );
}

export default Homepage;
