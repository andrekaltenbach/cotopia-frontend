import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SignInIcon } from '@phosphor-icons/react';
import { AuthContext } from '../context/auth.context';
import FoldableEventsMenu from './FoldableEventsMenu';
import UserDropOut from './UserDropOut';
import Hamburger from './Hamburger';

function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
    <div className="Header relative flex justify-between items-center border-b-1 shadow-md">
      <Link to="/" className="flex items-center py-4 mx-5 order-2 sm:order-0">
        <h1 className="title text-3xl text-teal-600">cotopia</h1>
      </Link>
      <div className="menu" ref={menuRef}>
        <ul
          className={`${
            hamburgerOpen
              ? 'absolute left-0 top-full w-full bg-orange-950 opacity-95 z-20 block'
              : 'hidden'
          } sm:flex justify-between gap-4`}
        >
          <li>
            <NavLink to="/" onClick={() => setHamburgerOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <FoldableEventsMenu setHamburgerOpen={setHamburgerOpen} />
          </li>
          <li>
            <NavLink to="/about" onClick={() => setHamburgerOpen(false)}>
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
                navigate('/login', { state: { from: location.pathname } });
              }}
              className="signinIcon"
            >
              <h3>sign in</h3>
            </button>
          </div>
          // <div className="mx-5 flex flex-row gap-2 items-center hover:text-teal-600 cursor-pointer">
          //   <h3 className=" hidden sm:block">sign in</h3>
          //   <button
          //     onClick={() => {
          //       navigate('/login', { state: { from: location.pathname } });
          //     }}
          //     className="signinIcon"
          //   >
          //     <SignInIcon size={32} weight="light" />
          //   </button>
          // </div>
        )}
      </div>
    </div>
  );
}

export default Header;
