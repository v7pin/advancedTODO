import axios from "axios";

const API_KEY = "c9b7e0aa420b485ec49a238ff59d1344"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (location) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        units: "metric",
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
