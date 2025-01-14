import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../store/tasksSlice";
import { fetchWeather } from "../api/weather";
import { FaTrash, FaCloud, FaTemperatureHigh, FaTint } from "react-icons/fa";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("New York");
  const [error, setError] = useState(null);

  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeather(location);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError("Unable to fetch weather data. Please check the location.");
    }
  };

  useEffect(() => {
    handleFetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6">
      {/* Weather Section */}
      <div className="w-full max-w-2xl p-6 bg-gradient-to-r from-blue-800 to-blue-300 text-white rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaCloud /> Weather Information
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 rounded border border-gray-200 text-black"
          />
          <button
            onClick={handleFetchWeather}
            className="p-2 bg-white text-blue-500 font-bold rounded hover:bg-blue-100 flex items-center gap-2 justify-center"
          >
            <FaCloud /> Get Weather
          </button>
        </div>
        {error && <p className="mt-4 text-red-200">{error}</p>}
        {weather && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{weather.name}</h3>
            <p className="flex items-center gap-2">
              <FaTemperatureHigh /> {weather.weather[0].description}
            </p>
            <p className="font-bold flex items-center gap-2">
              <FaTemperatureHigh /> {weather.main.temp}°C
            </p>
            <p className="flex items-center gap-2">
              <FaTint /> Humidity: {weather.main.humidity}%
            </p>
          </div>
        )}
      </div>

      {/* Task Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded shadow"
              >
                <div>
                  <p className="font-semibold">{task.text}</p>
                  <p className="text-sm text-yellow-800">
                    Priority: {task.priority}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="text-red-500 hover:text-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tasks available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
