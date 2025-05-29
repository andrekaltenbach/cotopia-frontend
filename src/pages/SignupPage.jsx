import { useState } from 'react';
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PopUp } from '../components/PopUp';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleNameInput = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');

    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {
        console.log('user created', response.data);

        setEmail('');
        setPassword('');
        setName('');

        navigate('/login');
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.error('Error:', err.response.data.message);
          toast.error(err.response.data.message);
        } else {
          console.log(err);
          toast.error('error: failed to signup');
        }
      });
  };

  return (
    <div className="card max-w-3xl">
      <h1 className="w-full text-center font-bold">Sign Up</h1>
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
            <button className="btn btn-primary-fill w-30">Sign Up</button>
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
