import { useState } from 'react';
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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
        localStorage.setItem('authToken', authToken);

        setEmail('');
        setPassword('');
        navigate('/');
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
        {email && password ? (
          <button className="btn btn-primary-fill">Login</button>
        ) : (
          <button disabled={true} className="btn btn-disabled">
            Login
          </button>
        )}
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>
      </form>
    </div>
  );
}
