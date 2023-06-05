import React from 'react'
import { Grid, Typography } from '@mui/material'
import { weatherCodeShortDescription, weatherCodeIconInterpreter } from '../../utils/weatherCodeInterpreter'
import useMediaQuery from '@mui/material/useMediaQuery';
import './DailyForecast.css'
import '../../css/weather-icons.css'
import { WeatherData } from '../../models/data.model';

interface DailyForecastProps {
  weatherRespData: WeatherData;
}

const dailyHelperArray = [1, 2, 3, 4, 5]

export default function DailyForecast(props: DailyForecastProps) {
  const matches700 = useMediaQuery('(min-width:700px)');

  const { daily, daily_units } = props.weatherRespData

  const formattedTime = (time: string) => {
    const date = new Date(time)
    const splitedDate = date.toLocaleTimeString("en-US", {
      weekday: 'short',
      month: "short", day: "numeric"
    }).split(',')

    return `${ splitedDate[0] } ${ splitedDate[1] }`
  }

  return (
    <Grid container className='dailyContainer' >
      <Grid container alignItems={ 'center' } justifyContent={ 'center' }>
        <Typography variant='h5' color={ 'white' } align={ 'center' } style={ { padding: '15px 0px 25px 0px' } }>  5-DAY FORECAST</Typography>
      </Grid>

      { dailyHelperArray.map((day: number) => {
        return (matches700 ? (
          <Grid container direction={ 'row' } item xs={ 12 } justifyContent='space-between' key={ day }>
            <Grid item xs={ 2 }>
              <Typography variant='h6' color={ 'white' } align={ 'center' } >
                { formattedTime(daily.time[day]) }
              </Typography>
            </Grid>
            <Grid item xs={ 2 }>
              <Typography variant='h4' color={ 'white' } align={ 'center' } style={ { padding: 5 } }>
                <i className={ `wi ${ weatherCodeIconInterpreter(daily.weathercode[day], 1) }` }></i>
              </Typography>
            </Grid>
            <Grid item xs={ 4 }>
              <Typography variant='h6' color={ 'white' } align={ 'center' }>
                { weatherCodeShortDescription(daily.weathercode[day]) }
              </Typography>
            </Grid>
            <Grid item xs={ 3 }>
              <Typography variant='h6' color={ 'white' } align={ 'center' }>
                <b>{ Math.round(daily.temperature_2m_max[day]) } </b>/  { Math.round(daily.temperature_2m_min[day]) } { daily_units.temperature_2m_max }
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction={ 'row' } item xs={ 12 } justifyContent='space-between' alignItems={ 'center' } key={ day }>
            <Grid item xs={ 4 } direction={ 'column' }>
              <Typography variant='h6' color={ 'white' } style={ { paddingLeft: 5 } }>
                { formattedTime(daily.time[day]) }
              </Typography>
              <Typography variant='h6' color={ 'white' } style={ { paddingLeft: 5 } }>
                <b>{ Math.round(daily.temperature_2m_max[day]) } </b>/  { Math.round(daily.temperature_2m_min[day]) } { daily_units.temperature_2m_max }
              </Typography>
            </Grid>
            <Grid item xs={ 4 } direction={ 'column' }>
              <Typography variant='h2' color={ 'white' } align={ 'center' } style={ { padding: 15 } }>
                <i className={ `wi ${ weatherCodeIconInterpreter(daily.weathercode[day], 1) }` }></i>
              </Typography>
            </Grid>
            <Grid item xs={ 3 }>
              <Typography variant='h6' color={ 'white' } align={ 'center' }>
                { weatherCodeShortDescription(daily.weathercode[day]) }
              </Typography>
            </Grid>
          </Grid>
        ))
      })
      }
    </Grid>
  )
}
