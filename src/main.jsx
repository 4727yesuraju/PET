import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PetsContextProvider } from './context/PetsContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PetsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PetsContextProvider>
  </React.StrictMode>,
);
