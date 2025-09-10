import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

function IsAdmin({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading)
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!user || user.role != 'admin') {
    return (
      <>
        <h2>Access denied!</h2>
        <p>You need admin privileges</p>
      </>
    );
  }
  return children;
}

export default IsAdmin;
