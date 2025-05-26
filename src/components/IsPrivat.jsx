import { useContext } from 'react';
import { AuthContext } from '../context/auth.content';
import { Navigate } from 'react-router-dom';

function IsPrivat({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <div className="loader mx-auto my-100"></div>;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivat;
