import { useContext, useState } from 'react';
import authService from '../services/auth.service';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth.context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { storeToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');

    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        const authToken = response.data.authToken;
        storeToken(authToken, { name: response.data.name });

        setEmail('');
        setPassword('');
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error('error: failed to login');
      });
  };

  return (
    <div className="card max-w-3xl">
      <h1 className="w-full text-center font-bold">Login</h1>
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
            <button className="btn btn-primary-fill w-30">Login</button>
          ) : (
            <button disabled={true} className="btn btn-disabled w-30">
              Login
            </button>
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
