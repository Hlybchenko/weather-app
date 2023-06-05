class Config {
  feBaseUrl: string;
  apiOpenMeteoUrl: string;
  ApiGeocodingUrl: string;

  constructor() {
    this.apiOpenMeteoUrl = process.env.REACT_APP_API_OPEN_METEO_URL || "https://api.open-meteo.com/v1/forecast?";
    this.ApiGeocodingUrl = process.env.REACT_APP_API_GEOCODING_URL || "https://geocoding-api.open-meteo.com/v1/search?";
    this.feBaseUrl = process.env.REACT_APP_FE_BASE_URL || "http://localhost:3000";
  }
}

export const config = new Config();