import { GoogleGenAI } from "@google/genai";
import { WeatherData, GeolocationCoordinates } from '../types';

/**
 * Fetches weather information using the Gemini API with Google Search grounding.
 * @param location The city or region for which to get weather.
 * @param coordinates Optional geographical coordinates for more precise search.
 * @returns A promise that resolves to WeatherData or null if an error occurs.
 */
export async function fetchWeatherWithGemini(
  location: string,
  coordinates?: GeolocationCoordinates,
): Promise<WeatherData | null> {
  // Ensure the API key is available.
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set.");
    return null;
  }

  // Create a new GoogleGenAI instance for each API call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    let prompt: string;
    let toolConfig: { retrievalConfig?: { latLng: { latitude: number; longitude: number; } } } = {};

    if (coordinates) {
      prompt = `Dime el pronóstico del tiempo en tiempo real para la ubicación con latitud ${coordinates.latitude} y longitud ${coordinates.longitude}${location ? ` (cerca de ${location})` : ''}. Describe las condiciones generales en una o dos palabras clave principales (por ejemplo, Soleado, Nublado, Lluvia, Nieve) al principio de tu resumen. Incluye también temperatura y pronóstico para las próximas 24 horas si es posible.`;
      toolConfig.retrievalConfig = {
        latLng: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      };
    } else {
      prompt = `Dime el pronóstico del tiempo en tiempo real para ${location}. Describe las condiciones generales en una o dos palabras clave principales (por ejemplo, Soleado, Nublado, Lluvia, Nieve) al principio de tu resumen. Incluye también temperatura y pronóstico para las próximas 24 horas si es posible.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }, { googleMaps: {} }], // Can use both googleSearch and googleMaps.
        toolConfig: toolConfig,
      },
    });

    const summary = response.text || "No se pudo obtener el pronóstico del tiempo.";
    const sources: { uri: string; title?: string }[] = [];

    // Extract grounding chunks from Google Search and Google Maps
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      for (const chunk of response.candidates[0].groundingMetadata.groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title });
        }
        if (chunk.maps?.uri) {
          sources.push({ uri: chunk.maps.uri, title: chunk.maps.title });
        }
        if (chunk.maps?.placeAnswerSources) {
          for (const source of chunk.maps.placeAnswerSources) {
            if (source.reviewSnippets) {
              for (const snippet of source.reviewSnippets) {
                if (snippet.uri) {
                  sources.push({ uri: snippet.uri, title: snippet.title || 'Review' });
                }
              }
            }
          }
        }
      }
    }

    return { summary, sources };
  } catch (error) {
    console.error("Error fetching weather from Gemini API:", error);
    return null;
  }
}