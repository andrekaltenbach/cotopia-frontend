import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

export default function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading)
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  // if (isLoading) return <div className="loader mx-auto my-100"></div>;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
