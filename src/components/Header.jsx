import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SignInIcon } from '@phosphor-icons/react';
import { AuthContext } from '../context/auth.content';
import FoldableEventsMenu from './FoldableEventsMenu';
import UserDropOut from './UserDropOut';
import logo from '../assets/images/cotopiaLogo.PNG';

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Header flex justify-between items-center border-b-1 shadow-md">
      <Link to="/" className="flex items-center py-4 mx-4">
        <img src={logo} alt="cotopia logo" className="h-12" />
        <h1 className="text-4xl text-teal-800 font-bold mx-2">cotopia</h1>
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
          <p className="text-teal-800">sign in</p>
          <Link to="/login">
            <button className="cursor-pointer text-teal-800">
              <SignInIcon size={32} weight="light" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
