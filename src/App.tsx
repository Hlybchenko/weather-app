import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { fetchGeoCodingCity, fetchGeoCodingWeather } from './services/fetchService';
import { GeoCodingCityData, GeoCodingWeatherData, WeatherData, GeoCodingCity } from './models/data.model';
import Search from './components/Search/Search';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import DailyForecast from './components/DailyForecast/DailyForecast';
import LinearSpinner from './components/Spinner/LinearSpinner';
import './App.css';

function App() {
  const [cityRespData, setCityRespData] = useState<GeoCodingCity>({} as GeoCodingCity);
  const [weatherRespData, setWeatherRespData] = useState<WeatherData>({} as WeatherData);
  const [unit, setUnit] = useState<string>('celsius');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    localStorage.clear()
  }, [])

  const cityData: GeoCodingCityData = {
    name: cityRespData.name,
    count: 1,
    language: 'en',
    format: 'json',
  };

  const weatherData: GeoCodingWeatherData = {
    latitude: cityRespData.latitude,
    longitude: cityRespData.longitude,
    timezone: cityRespData.timezone,
    current_weather: true,
    temperature_unit: unit,
    forecast_days: 6,
  };

  const fetchWeatherData = () => {
    setIsLoading(true);
    const cacheKey = `${ weatherData.timezone },${ weatherData.latitude },${ weatherData.longitude },${ weatherData.temperature_unit }`;
    const cachedWeatherData = JSON.parse(localStorage.getItem(cacheKey) || '{}');

    if (Object.keys(cachedWeatherData).length !== 0) {
      setWeatherRespData(cachedWeatherData);
      setIsLoading(false);
      return;
    }

    fetchGeoCodingWeather({ ...weatherData, temperature_unit: unit })
      .then((data) => {
        setWeatherRespData(data);
        setIsLoading(false);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage('City not found');
      });
  };

  useEffect(() => {
    if (cityRespData.name === undefined) return;

    if (isError) {
      setCityRespData({} as GeoCodingCity);
      setWeatherRespData({} as WeatherData);
      localStorage.clear()

    } else {
      if (weatherData.latitude !== 0 || weatherData.longitude !== 0) {
        const cacheKey = `${ weatherData.latitude },${ weatherData.longitude },${ weatherData.timezone }`;
        if (localStorage.getItem(cacheKey)) {
          setWeatherRespData(JSON.parse(localStorage.getItem(cacheKey) || '{}'));
          setIsLoading(false);
        } else {
          fetchWeatherData();
        }
      }
    }
  }, [cityRespData.name, unit, isError]);

  const handleSearchCity = async (city: string) => {
    if (city.trim().toLowerCase() === cityRespData.name?.toLowerCase()) return;

    setIsLoading(true);
    const cachedCityData = JSON.parse(localStorage.getItem(city) || '{}');
    if (Object.keys(cachedCityData).length !== 0) {
      setCityRespData(cachedCityData);
      setIsLoading(false);
    } else {
      try {
        const cityResponse = await fetchGeoCodingCity({ ...cityData, name: city });
        setIsError(false);
        setErrorMessage('');
        setCityRespData(cityResponse.results[0]);
        localStorage.setItem(city, JSON.stringify(cityResponse.results[0]));
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage('City not found');
      }
    }
  };

  const handleTemperatureUnit = (temperatureUnit: string) => {
    if (unit !== temperatureUnit) {
      setIsLoading(true);
      setUnit(temperatureUnit);
    }
  };

  return (
    <div className="App">
      <div style={ { position: 'relative', height: 10 } }>
        { isLoading && <LinearSpinner /> }
      </div>
      <Container maxWidth="md">
        <Search
          handleSearchCity={ handleSearchCity }
          isError={ isError }
          errorMessage={ errorMessage }
        />
        { weatherRespData.latitude && cityRespData.name && (
          <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
            <Grid item xs={ 12 }>
              <CurrentWeather
                weatherRespData={ weatherRespData }
                cityRespData={ cityRespData }
                handleTemperatureUnit={ handleTemperatureUnit }
                unit={ unit }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <DailyForecast weatherRespData={ weatherRespData } />
            </Grid>
          </Grid>
        ) }
      </Container>
    </div>
  );
}

export default App;
