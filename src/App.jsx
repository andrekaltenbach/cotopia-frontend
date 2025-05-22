import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import EventsListPage from './pages/EventsListPage';
import EventDetailsPage from './pages/EventDetailsPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <>
      <Header />
      <main className="py-5 px-4 container max-w-5x1 mx-auto">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
