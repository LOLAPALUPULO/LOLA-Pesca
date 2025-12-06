import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div
        className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;