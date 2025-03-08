import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskWeather } from "../../redux/tasksSlice";

const WeatherWidget = ({ location, taskId }) => {
  const dispatch = useDispatch();
  const weather = useSelector(
    (state) => state.tasks.items.find((task) => task.id === taskId)?.weather
  );

  useEffect(() => {
    if (location && !weather) {
      dispatch(fetchTaskWeather({ location, taskId }));
    }
  }, [location, taskId, dispatch]);

  if (!weather)
    return <div className="mt-2 text-gray-500">Loading weather...</div>;

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-md">
      <div className="flex items-center space-x-3">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-12 h-12"
        />
        <div>
          <h3 className="font-medium">
            {Math.round(weather.main.temp - 273.15)}°C
          </h3>
          <p className="text-sm text-gray-600 capitalize">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
        <div>Humidity: {weather.main.humidity}%</div>
        <div>Wind: {weather.wind.speed}m/s</div>
        <div>Pressure: {weather.main.pressure}hPa</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
