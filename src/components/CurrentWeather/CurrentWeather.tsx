import React from 'react'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'
import { weatherCodeDescription, weatherCodeIconInterpreter } from '../../utils/weatherCodeInterpreter';
import { GeoCodingCity, WeatherData } from '../../models/data.model';
import useMediaQuery from '@mui/material/useMediaQuery';
import './CurrentWeather.css'
import '../../css/weather-icons.css'

interface CurrentWeatherProps {
  cityRespData: GeoCodingCity;
  weatherRespData: WeatherData;
  handleTemperatureUnit: (temperatureUnit: CurrentWeatherProps) => void;
}

export default function CurrentWeather(props: any) {
  const matches450 = useMediaQuery('(min-width:450px)');

  const { name } = props.cityRespData
  const { current_weather, daily_units } = props.weatherRespData
  const { handleTemperatureUnit } = props

  const formattedTime = (time: string) => {
    const date = new Date(time)
    return date.toLocaleTimeString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).split(",").join(" ")
  }

  return (
    <Grid container
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Grid>
        <Grid>
          <Typography variant='h2' sx={ { color: 'white' } }>{ name }</Typography>
        </Grid>
        <Grid>
          <Typography variant='h5' sx={ { color: 'white' } }>{ formattedTime(current_weather.time) }</Typography>
        </Grid>
        <Grid>
          <br />
          <Typography variant='h5' sx={ { color: 'white' } }>{ weatherCodeDescription(current_weather.weathercode) }</Typography>
        </Grid>
        <Grid container>
          <Typography variant={ matches450 ? 'h1' : 'h2' } sx={ { color: 'white' } }>{ Math.round(current_weather.temperature) }
            { daily_units.temperature_2m_max }
            { !matches450 && (
              <i
                style={ { paddingLeft: 25 } }
                className={ `wi ${ weatherCodeIconInterpreter(current_weather.weathercode, current_weather.is_day) }` }
              />
            ) }
          </Typography>
        </Grid>
        <Typography variant='h6' sx={ { color: 'white' } }>
          <ButtonGroup color='warning' variant='contained' aria-label="unit1">
            <Button key="celsium" onClick={ () => handleTemperatureUnit('celsium') }>°C</Button>
            <Button key="fahrenheit" onClick={ () => handleTemperatureUnit('fahrenheit') }>°F</Button>
          </ButtonGroup>
        </Typography>
      </Grid>
      { matches450 && (<Grid>
        <Typography style={ { fontSize: 140 } } variant='h1' sx={ { color: 'white' } }>
          <i className={ `wi ${ weatherCodeIconInterpreter(current_weather.weathercode, current_weather.is_day) }` }></i>
        </Typography>
      </Grid>) }
    </Grid>
  )
}
