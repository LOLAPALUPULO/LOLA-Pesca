export interface WeatherData {
  summary: string;
  sources: { uri: string; title?: string }[];
}

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}
