import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Add this import
import PressureChart from './components/PressureChart';

// Define el tipo para los datos de presión, que se almacenan en el historial global
declare global {
  interface Window {
    appPressureHistory: { time: string; hpa: number }[];
  }
}

const App: React.FC = () => {
  const [pressureHistory, setPressureHistory] = useState<{ time: string; hpa: number }[]>([]);

  useEffect(() => {
    // Inicializa el historial de presión al montar el componente
    setPressureHistory(window.appPressureHistory || []);

    // Define el listener para el evento de actualización de presión
    const handleNewPressureData = () => {
      setPressureHistory([...window.appPressureHistory]); // Actualiza el estado con una copia del historial global
    };

    // Agrega el listener al objeto window
    window.addEventListener('newPressureData', handleNewPressureData);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('newPressureData', handleNewPressureData);
    };
  }, []);

  // Busca el contenedor en index.html donde montar el gráfico de presión
  const chartContainer = document.getElementById('pressure-chart-container');
  if (!chartContainer) {
    console.error("Could not find pressure-chart-container element to mount PressureChart to");
    return null;
  }

  // Renderiza el componente PressureChart dentro del div específico
  return ReactDOM.createPortal(
    <PressureChart data={pressureHistory} />,
    chartContainer
  );
};

export default App;