import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

function IsPrivat({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading)
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  // if (isLoading) return <div className="loader mx-auto my-100"></div>;
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

export default IsPrivat;
