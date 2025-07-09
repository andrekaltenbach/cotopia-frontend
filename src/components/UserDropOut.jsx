import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import PopUpModal from './PopUpModal';

export default function UserDropOut() {
  const { user, logOutUser } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

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

  const handleDelete = () => {
    userService
      .deleteUser(user._id)
      .then((response) => {
        console.log('User account deleted', response.data);
        toast.success('User account deleted');
        handleDropdownToggle();
        logOutUser();
        navigate('/');
      })
      .catch((err) => {
        console.log('error: ', err);
        toast.error('error: failed to delete user account');
      });
  };

  return (
    <div className="relative-div relative mx-5 my-0" ref={dropdownRef}>
      <button
        type="button"
        className="user-profile w-10 h-10 rounded-full overflow-hidden border-none outline-none cursor-pointer flex justify-center items-center bg-amber-600 text-gray-200 font-semibold tracking-widest text-base"
        onClick={handleDropdownToggle}
      >
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
        <div
          className={`custom-profile-dropdown${
            dropdownToggle ? ' active' : ''
          } bg-teal-800 border-teal-800 rounded-2xl w-52 h-fit absolute top-15 -right-2.5 p-3`}
        >
          <h3 className="menu-name text-center w-full text-lg py-5 font-semibold leading-[1.2em] text-gray-200">
            {user.name}
          </h3>
          <div className="menu-items-div w-full">
            <div className="menu-item text-gray-200">
              <div onClick={logOutUser} className="menu-item-link">
                <p>Logout</p>
              </div>
            </div>
            <div className="menu-item border-t">
              <div onClick={() => setOpenModal(true)} className="menu-item-link">
                Delete Account
              </div>
              <PopUpModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handlerFunction={handleDelete}
                message="Are you sure you want to delete your account?"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
