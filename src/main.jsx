import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);
