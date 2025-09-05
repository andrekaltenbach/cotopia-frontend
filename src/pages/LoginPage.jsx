import { useContext, useState } from 'react';
import authService from '../services/auth.service';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth.context';
import { PopUp } from '../components/PopUp';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  // Get the full location to redirect to after login. Default to '/profile'.
  const from = location.state?.from || '/profile';

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    try {
      const response = await authService.login(requestBody);
      const authToken = response.data.authToken;

      storeToken(authToken);
      authenticateUser();

      navigate(from, { replace: true });
    } catch (err) {
      if (err.response && err.response.data) {
        console.error('Error:', err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.log(err);
        toast.error('error: failed to login');
      }
    }
  };

  return (
    <div className="card max-w-3xl">
      <h2 className="w-full text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">
            Email: <span className="text-red-700">*</span>
          </label>
          <input type="text" name="email" value={email} onChange={handleEmailInput} />
        </div>
        <div className="form-control">
          <label htmlFor="password">
            Password: <span className="text-red-700">*</span>
          </label>
          <input type="password" name="password" value={password} onChange={handlePasswordInput} />
        </div>
        <div className="w-full mt-3 text-sm">
          <span className="text-red-700">*</span> required
        </div>

        <div className="text-center mt-8">
          {email && password ? (
            <button className="btn btn-primary w-30">Login</button>
          ) : (
            <PopUp>
              <button disabled={true} className="btn btn-disabled w-30">
                Login
              </button>
            </PopUp>
          )}
          <Link to="/">
            <button className="btn btn-secondary ml-5">Cancel</button>
          </Link>
        </div>
      </form>
      <div className="mt-10">
        <p className="text-center">
          You don't have an account? <br />
          <Link to="/signup" className="text-teal-600">
            Click here to sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
