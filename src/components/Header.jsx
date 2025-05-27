import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SignInIcon } from '@phosphor-icons/react';
import { AuthContext } from '../context/auth.content';
import FoldableEventsMenu from './FoldableEventsMenu';
import UserDropOut from './UserDropOut';

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="Header flex justify-between items-center border-b-1 shadow-md">
      <Link to="/" className="flex items-center py-4 mx-4">
        <h1 className="text-3xl text-teal-600 font-bold mx-2">cotopia</h1>
      </Link>
      <ul className="flex justify-between gap-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <FoldableEventsMenu />
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
      {isLoggedIn && <UserDropOut />}
      {!isLoggedIn && (
        <div className="mx-5 flex flex-col items-center">
          <p className="text-teal-600">sign in</p>
          {/* <Link to="/login"> */}
          <button
            onClick={() => {
              navigate('/login', { state: { from: location.pathname } });
            }}
            className="cursor-pointer text-teal-600"
          >
            <SignInIcon size={32} weight="light" />
          </button>
          {/* </Link> */}
        </div>
      )}
    </div>
  );
}

export default Header;
