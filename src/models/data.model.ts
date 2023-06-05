
export interface GeoCodingResponse {
  results: GeoCodingCity[];
}

export interface GeoCodingCity {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: HourlyData;
  hourly_units: HourlyUnits;
  current_weather: CurrentWeather;
  weathercode: number[];
  daily_units: DailyUnits;
  daily: DailyData;
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  weathercode: number[];
}


interface HourlyData {
  time?: string[];
  temperature_2m: number[];
  // Add other hourly properties if needed
}

interface HourlyUnits {
  time?: string;
  temperature_2m: string;
  weathercode?: string;
  // Add other unit properties if needed
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  weathercode: number;
  windspeed: number;
  winddirection: number;
  // Add other current weather properties if needed
}

export interface GeoCodingWeatherData {
  latitude: number,
  longitude: number,
  current_weather?: boolean,
  temperature_unit?: string,
  forecast_days?: number,
  timezone?: string,
}

export interface GeoCodingCityData {
  name: string,
  count?: number,
  language?: string,
  format?: string,
}