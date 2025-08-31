import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure JSX runtime is properly imported

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>


);