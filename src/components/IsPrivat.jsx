import { useContext } from 'react';
import { AuthContext } from '../context/auth.content';
import { Navigate, useLocation } from 'react-router-dom';

function IsPrivat({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return <div className="loader mx-auto my-100"></div>;
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  } else {
    return children;
  }
}

export default IsPrivat;
