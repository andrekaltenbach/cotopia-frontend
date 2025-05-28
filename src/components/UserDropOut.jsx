import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export default function UserDropOut() {
  const { user, logOutUser } = useContext(AuthContext);

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownToggle(!dropdownToggle);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="relative-div" ref={dropdownRef}>
      <button type="button" className="user-profile" onClick={handleDropdownToggle}>
        {user?.name &&
          user.name
            .split(' ')
            .map((partName, index) => {
              return index === 0 || index === user.name.split(' ').length - 1
                ? partName.charAt(0).toUpperCase()
                : '';
            })
            .join('')}
      </button>
      {user && (
        <div className={`custom-profile-dropdown${dropdownToggle ? ' active' : ''}`}>
          <h3 className="menu-name">{user.name}</h3>
          <div className="menu-items-div">
            <div className="menu-item">
              <NavLink to="/user/profile" className="menu-item-link">
                Profile
              </NavLink>
            </div>
            <div className="menu-item">
              <div onClick={logOutUser} className="menu-item-link">
                <p>Logout</p>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-item-link border-t">Delete Account</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
