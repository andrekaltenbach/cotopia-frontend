// src/pages/SignupPage.jsx

import { useState, useContext } from 'react'; // 1. Import useContext
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PopUp } from '../components/PopUp';
import { AuthContext } from '../context/auth.context'; // 2. Import AuthContext

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // 3. Get the functions we need from our context
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleNameInput = (e) => setName(e.target.value);

  // 4. Convert the handleSubmit function to an async function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupRequestBody = { email, password, name };

    try {
      // Step A: Create the user. This doesn't return a token.
      await authService.signup(signupRequestBody);

      // Step B: Immediately log the new user in to get the token.
      const loginRequestBody = { email, password };
      const response = await authService.login(loginRequestBody);

      // Step C: Store the token we received from the login response.
      storeToken(response.data.authToken);

      // Step D: Verify the token and update the global state. We `await` this
      // to ensure the user is fully authenticated before we navigate.
      authenticateUser();

      // Step E: Now that the user is authenticated, navigate to their profile!
      navigate('/profile');
    } catch (err) {
      // This will catch errors from signup, login, or authentication
      if (err.response && err.response.data) {
        console.error('Error:', err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.log(err);
        toast.error('Error: failed to sign up');
      }
    }
  };

  return (
    <div className="card max-w-3xl">
      <h2 className="w-full text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* The rest of your form JSX remains exactly the same */}
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
        <div className="form-control">
          <label htmlFor="name">
            Name: <span className="text-red-700">*</span>
          </label>
          <input type="text" name="name" value={name} onChange={handleNameInput} />
        </div>
        <div className="w-full mt-3 text-sm">
          <span className="text-red-700">*</span> required
        </div>

        <div className="text-center mt-8">
          {email && password && name ? (
            <button className="btn btn-primary w-30">Sign Up</button>
          ) : (
            <PopUp>
              <button disabled={true} className="btn btn-disabled w-30">
                Sign Up
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
          Already have an account? <br />
          <Link to="/login" className="text-teal-600">
            Click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}
