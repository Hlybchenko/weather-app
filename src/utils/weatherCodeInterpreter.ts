export function weatherCodeShortDescription(weathercode: number) {
  switch (weathercode) {
    case 0:
      return "Clear sky";
    case 1:
    case 2:
    case 3:
      return "Cloudy";
    case 45:
    case 48:
      return "Fog";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "Drizzle";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "Rain";
    case 71:
    case 73:
    case 75:
    case 77:
      return "Snow";
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return "Showers";
    case 95:
    case 96:
    case 99:
      return "Thunderstorm";
    default:
      return "Unknown weather code";
  }
}

export function weatherCodeDescription(weathercode: number) {
  switch (weathercode) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Depositing rime fog";
    case 51:
      return "Light drizzle";
    case 53:
      return "Moderate drizzle";
    case 55:
      return "Dense intensity drizzle";
    case 56:
      return "Light freezing drizzle";
    case 57:
      return "Dense intensity freezing drizzle";
    case 61:
      return "Slight rain";
    case 63:
      return "Moderate  rain";
    case 65:
      return "Heavy intensity  rain";
    case 66:
      return "Light freezing rain";
    case 67:
      return "Heavy intensity freezing rain";
    case 71:
      return "Slight snow fall";
    case 73:
      return "Moderate snow fall";
    case 75:
      return "heavy intensity snow fall";
    case 77:
      return "Snow grains";
    case 80:
      return "Slight rain showers";
    case 81:
      return "Moderate  rain showers";
    case 82:
      return "Violent rain showers";
    case 85:
      return "Slight snow showers";
    case 86:
      return "Heavy snow showers";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case 96:
      return "Thunderstorm with slight";
    case 99:
      return "Thunderstorm with heavy hail";
    default:
      return "Unknown weather code";
  }
}

export function weatherCodeIconInterpreter(weathercode: number, is_day: number) {

  if (weathercode === 0) {
    return is_day ? 'wi-day-sunny' : 'wi-night-clear';
  }
  if (weathercode === 1) {
    return is_day ? 'wi-day-cloudy' : 'wi-night-alt-cloudy';
  }
  if (weathercode === 2) {
    return is_day ? 'wi-day-sunny-overcast' : 'wi-night-partly-cloudy';
  }
  if (weathercode === 3) {
    return is_day ? 'wi-day-cloudy-high' : 'wi-night-cloudy-high';
  }
  if (weathercode === 45 || weathercode === 48) {
    return is_day ? 'wi-day-fog' : 'wi-night-fog';
  }
  if (weathercode === 51 || weathercode === 53 || weathercode === 55) {
    return is_day ? 'wi-sprinkle' : 'wi-night-alt-showers';
  }
  if (weathercode === 56 || weathercode === 57) {
    return is_day ? 'wi-day-showers' : 'wi-night-showers';
  }
  if (weathercode === 61 || weathercode === 63 || weathercode === 65) {
    return is_day ? 'wi-day-rain-wind' : 'wi-night-rain';
  }
  if (weathercode === 66 || weathercode === 67) {
    return is_day ? 'wi-day-sleet' : 'wi-night-sleet';
  }
  if (weathercode === 71 || weathercode === 73 || weathercode === 75) {
    return is_day ? 'wi-day-snow' : 'wi-night-snow';
  }
  if (weathercode === 77 || weathercode === 80 || weathercode === 81 || weathercode === 82) {
    return is_day ? 'wi-day-snow-wind' : 'wi-night-snow-wind';
  }
  if (weathercode === 85 || weathercode === 86) {
    return is_day ? 'wi-day-snow-thunderstorm' : 'wi-night-snow-thunderstorm';
  }
  if (weathercode === 95) {
    return is_day ? 'wi-day-thunderstorm' : 'wi-night-thunderstorm';
  }
  if (weathercode === 96 || weathercode === 99) {
    return is_day ? 'wi-day-hail' : 'wi-night-hail';
  }

  return is_day ? 'wi-day-sunny' : 'wi-night-clear';
}