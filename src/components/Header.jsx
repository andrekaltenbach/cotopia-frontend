import { Link, NavLink } from 'react-router-dom';
import FoldableEventsMenu from './FoldableEventsMenu';
import logo from '../assets/images/cotopiaLogo.PNG';

function Header() {
  return (
    <div className="Header flex justify-between items-center border-b-1 shadow-md">
      <Link to="/" className="flex items-center py-4 mx-4">
        <img src={logo} alt="cotopia logo" className="h-12" />
        <h1 className="text-4xl text-teal-800 font-bold mx-2">cotopia</h1>
      </Link>
      <ul className="w-45 flex justify-between gap-4">
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
      <div>
        <Link to="/signup">
          <button className="btn btn-primary">Signup</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary mx-4">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
