import { useContext } from 'react';
import { AuthContext } from '../context/auth.content';
import { Navigate } from 'react-router-dom';

export default function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;
  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
