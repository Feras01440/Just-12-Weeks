import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouteProvider } from './router.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </React.StrictMode>
);
