import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected import for ReactDOM
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Using ReactDOM.createRoot() to render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
