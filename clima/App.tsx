import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeatherWithGemini } from './services/geminiService';
import { WeatherData, GeolocationCoordinates } from './types';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';
import WeatherIconDisplay from './components/WeatherIconDisplay'; // Import new component
import Markdown from 'react-markdown'; // For rendering markdown content

// Helper component for rendering links
interface LinkRendererProps {
  href?: string;
  children?: React.ReactNode;
}

const LinkRenderer: React.FC<LinkRendererProps> = ({ href, children }) => {
  if (!href) return <>{children}</>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
      {children}
    </a>
  );
};


function App() {
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<GeolocationCoordinates | undefined>(undefined);
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState<string>('cargando'); // Default state for icon

  const parseWeatherCondition = (summary: string): string => {
    if (!summary) return 'desconocido';
    const lowerSummary = summary.toLowerCase();
    if (lowerSummary.includes('soleado') || lowerSummary.includes('despejado')) return 'soleado';
    if (lowerSummary.includes('nublado') || lowerSummary.includes('nubes')) return 'nublado';
    if (lowerSummary.includes('lluvia') || lowerSummary.includes('chubascos')) return 'lluvia';
    if (lowerSummary.includes('nieve') || lowerSummary.includes('nevada')) return 'nieve';
    if (lowerSummary.includes('tormenta')) return 'tormenta';
    // Fallback if no specific keyword is found, try to extract first relevant word
    const match = summary.match(/^(soleado|despejado|nublado|lluvia|chubascos|nieve|nevada|tormenta)/i);
    if (match) return match[1].toLowerCase();
    return 'desconocido';
  };


  const handleFetchWeather = useCallback(async (loc: string, coords?: GeolocationCoordinates) => {
    setLoading(true);
    setError(null);
    setCurrentWeatherCondition('cargando'); // Set loading state for icon
    try {
      const data = await fetchWeatherWithGemini(loc, coords);
      if (data) {
        setWeatherData(data);
        setCurrentWeatherCondition(parseWeatherCondition(data.summary));
      } else {
        setError("No se pudo obtener el pronóstico del tiempo. Inténtalo de nuevo.");
        setWeatherData(null);
        setCurrentWeatherCondition('desconocido');
      }
    } catch (err) {
      console.error("Error al buscar el clima:", err);
      setError("Ocurrió un error al buscar el clima. Por favor, inténtalo más tarde.");
      setWeatherData(null);
      setCurrentWeatherCondition('desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGetLocationWeather = useCallback(() => {
    setError(null);
    if ("geolocation" in navigator) {
      setLoading(true);
      setCurrentWeatherCondition('cargando'); // Set loading state for icon
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: GeolocationCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserCoordinates(coords);
          handleFetchWeather('', coords); // Pass empty string for location if using coords
        },
        (geoError) => {
          console.error("Error getting geolocation:", geoError);
          setError("No se pudo obtener tu ubicación. Por favor, introduce una ciudad manualmente o revisa los permisos de ubicación.");
          setLoading(false);
          setCurrentWeatherCondition('desconocido');
        }
      );
    } else {
      setError("Tu navegador no soporta la geolocalización.");
      setCurrentWeatherCondition('desconocido');
    }
  }, [handleFetchWeather]);

  // Initial load or default weather for a city like "Madrid" if no location is provided
  useEffect(() => {
    if (!weatherData && !loading) {
      handleFetchWeather('Madrid'); // Fetch weather for a default city on initial load
    }
  }, [weatherData, loading, handleFetchWeather]);

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 max-w-lg w-full transform transition-all duration-300 hover:scale-105">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-6">
        Predicción del Clima
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Introduce una ciudad o región"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
        />
        <Button
          onClick={() => handleFetchWeather(location)}
          disabled={loading || !location.trim()}
          className="w-full sm:w-auto"
        >
          Buscar Clima
        </Button>
      </div>

      <div className="mb-8 text-center">
        <Button
          onClick={handleGetLocationWeather}
          variant="secondary"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500"
        >
          Usar mi ubicación actual
        </Button>
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {weatherData && (
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg p-6 shadow-inner border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Pronóstico Actual
          </h2>
          <WeatherIconDisplay condition={currentWeatherCondition} /> {/* Integrated WeatherIconDisplay */}
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-4">
            <Markdown components={{ a: LinkRenderer }}>
              {weatherData.summary}
            </Markdown>
          </div>

          {weatherData.sources.length > 0 && (
            <div className="border-t border-indigo-300 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Fuentes:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {weatherData.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:underline break-all"
                    >
                      {source.title || source.uri}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;