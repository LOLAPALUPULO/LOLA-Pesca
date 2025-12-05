import React from 'react';
import ReactDOM from 'react-dom/client';

// Apunta al div oculto en index.html para montar la lógica de React
const rootElement = document.getElementById('react-root-dummy');
if (!rootElement) {
  throw new Error("Could not find react-root-dummy element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* El componente App ha sido eliminado. Ya no se renderiza nada de React aquí. */}
  </React.StrictMode>
);