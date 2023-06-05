import { GeoCodingWeatherData, WeatherData, GeoCodingResponse, GeoCodingCityData, } from "../models/data.model";
import { config } from "./configService";



export async function fetchGeoCodingWeather(geoCodingWeatherData: GeoCodingWeatherData): Promise<WeatherData> {
  const url = `${ config.apiOpenMeteoUrl }latitude=${ geoCodingWeatherData.latitude }&longitude=${ geoCodingWeatherData.longitude }&hourly=apparent_temperature,is_day&forecast_days=${ geoCodingWeatherData.forecast_days }&current_weather=${ geoCodingWeatherData.current_weather ? 'true' : 'false' }&${ geoCodingWeatherData.temperature_unit === 'fahrenheit' ? 'temperature_unit=fahrenheit' : '' }&timezone=${ geoCodingWeatherData.timezone }&daily=weathercode,temperature_2m_max,temperature_2m_min`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function fetchGeoCodingCity(geoCodingCityData: GeoCodingCityData): Promise<GeoCodingResponse> {
  const url = `${ config.ApiGeocodingUrl }name=${ geoCodingCityData.name }&count=${ geoCodingCityData.count }&language=${ geoCodingCityData.language }&format=${ geoCodingCityData.format }`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
