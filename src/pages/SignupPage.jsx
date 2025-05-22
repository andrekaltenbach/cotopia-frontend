import { useState } from 'react';
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

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
      .then((_) => {
        console.log('user created');
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" value={email} onChange={handleEmailInput} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={handlePasswordInput} />
        </div>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={name} onChange={handleNameInput} />
        </div>
        {email && password && name ? (
          <button className="btn btn-primary-fill">Sign Up</button>
        ) : (
          <button disabled={true} className="btn btn-disabled">
            Signup
          </button>
        )}
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>
      </form>
    </div>
  );
}
