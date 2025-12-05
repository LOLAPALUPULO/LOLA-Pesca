import React, { useState, useEffect } from 'react';

// Constantes para la simulación de HPA (inlined del antiguo constants.ts)
const SIMULATION_INTERVAL_MS = 1500; // Actualizar cada 1.5 segundos
const BASE_HPA_PRESSURE = 1013.25; // Presión atmosférica estándar en hPa
const HPA_FLUCTUATION_RANGE = 2; // Rango de fluctuación máximo +/- 2 hPa

// Utilidad para simular datos de presión HPA
const simulateHPA = (lastHPA: number): number => {
  const fluctuation = (Math.random() - 0.5) * HPA_FLUCTUATION_RANGE * 2; // -HPA_FLUCTUATION_RANGE a +HPA_FLUCTUATION_RANGE
  let newHPA = lastHPA + fluctuation;

  // Mantener la presión dentro de un rango razonable (ej. 980-1050 hPa para presión atmosférica)
  if (newHPA < 980) newHPA = 980 + Math.random() * 5;
  if (newHPA > 1050) newHPA = 1050 - Math.random() * 5;

  return newHPA;
};

const App: React.FC = () => {
  const [currentHPA, setCurrentHPA] = useState<number>(BASE_HPA_PRESSURE);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHPA((prevHPA) => {
        const newHPA = simulateHPA(prevHPA);
        
        // Actualiza el elemento #press en el DOM
        const pressElement = document.getElementById('press');
        if (pressElement) {
          pressElement.innerText = newHPA.toFixed(0); // Redondeado para el display original
        }

        // Actualiza el elemento #press-desc y su color en el DOM
        const pDescElement = document.getElementById('press-desc');
        if (pDescElement) {
          let descText: string;
          let descColor: string;
          if (newHPA <= 1009) {
            descText = "BAJA";
            descColor = "var(--danger)"; // Usa la variable CSS definida en index.html
          } else if (newHPA >= 1016) {
            descText = "ALTA";
            descColor = "var(--green)"; // Usa la variable CSS definida en index.html
          } else {
            descText = "ESTABLE";
            descColor = "#aaa"; // Color predeterminado o de estabilidad
          }
          pDescElement.innerText = descText;
          pDescElement.style.color = descColor;
        }

        return newHPA;
      });
    }, SIMULATION_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []); // El array de dependencias vacío asegura que se ejecuta una sola vez al montar

  // El componente App no renderiza nada visible, solo maneja la lógica y las actualizaciones del DOM
  return null;
};

export default App;