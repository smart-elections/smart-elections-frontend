import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppStateProvider } from './context/appStateProvider';
import axios from 'axios';
axios.defaults.baseURL = 'http://ec2-44-202-30-87.compute-1.amazonaws.com:8000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
