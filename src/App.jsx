import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import EventsListPage from './pages/EventsListPage';
import EventDetailsPage from './pages/EventDetailsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import IsAnon from './components/IsAnon';

function App() {
  return (
    <div className="">
      <Header />
      <main className="pt-2 pb-5 px-4 container max-w-5x1 mx-auto min-h-[calc(100vh_-_130px)]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        //transition={Bounce}
      />
      <Footer />
    </div>
  );
}
export default App;
