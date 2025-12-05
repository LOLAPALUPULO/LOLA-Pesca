import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Apunta al div oculto en index.html para montar la lógica de React
const rootElement = document.getElementById('react-root-dummy');
if (!rootElement) {
  throw new Error("Could not find react-root-dummy element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);