import axios from "axios";

export const fetchWeather = async (location) => {
  try {
    return await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};
