import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import FoldableEventsMenu from './FoldableEventsMenu';
import UserDropOut from './UserDropOut';
import Hamburger from './Hamburger';

function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  useEffect(() => {
    if (!hamburgerOpen) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHamburgerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hamburgerOpen]);

  return (
    <div className="Header bg-teal-800 relative flex justify-between items-center border-b-1 shadow-md">
      <Link to="/" className="flex items-center py-4 mx-5 order-2 sm:order-0">
        <h1 className="title">cotopia</h1>
      </Link>
      <div className="menu" ref={menuRef}>
        <ul
          className={`${
            hamburgerOpen
              ? 'absolute left-0 top-full w-full bg-gray-700 text-gray-200 z-20 block p-2 rounded-b-lg'
              : 'hidden'
          } sm:flex sm:justify-between sm:gap-4 text-gray-200`}
        >
          <li>
            <NavLink
              to="/"
              onClick={() => setHamburgerOpen(false)}
              className="block w-full sm:w-fit"
            >
              Home
            </NavLink>
          </li>
          <li className="w-full cursor-pointer sm:w-fit sm:cursor-default">
            <FoldableEventsMenu setHamburgerOpen={setHamburgerOpen} />
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setHamburgerOpen(false)}
              className="block w-full sm:w-fit"
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className="hamburger order-1 ml-5 mr-9 sm:hidden" onClick={toggleHamburger}>
          <Hamburger />
        </div>
      </div>
      <div className="order-3 sm:ml-16">
        {isLoggedIn && <UserDropOut />}
        {!isLoggedIn && (
          <div className="mx-5 hover:text-teal-600 cursor-pointer">
            <button
              onClick={() => {
                navigate('/login', { state: { from: location } });
              }}
              className="signinIcon"
            >
              <h3 className="text-gray-200 cursor-pointer">sign in</h3>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
