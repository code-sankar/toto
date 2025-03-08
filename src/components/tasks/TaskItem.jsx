import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleComplete, updateTask } from "../../redux/tasksSlice";
import WeatherWidget from "../weather/WeatherWidget";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [showWeather, setShowWeather] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedLocation, setEditedLocation] = useState(task.location || "");

  const priorityColors = {
    high: "red-600",
    medium: "yellow-500",
    low: "green-600",
  };

  const handleUpdate = () => {
    if (editedText.trim()) {
      dispatch(
        updateTask({
          id: task.id,
          text: editedText,
          priority: editedPriority,
          location: editedLocation,
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(task.text);
    setEditedPriority(task.priority);
    setEditedLocation(task.location || "");
    setIsEditing(false);
  };

  return (
    <div className="bg-white  p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
            className="w-5 h-5 text-blue-600"
          />

          {isEditing ? (
            <div className="flex flex-col space-y-2 flex-grow">
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="border rounded px-2 py-1 flex-grow"
                autoFocus
              />
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="border rounded px-2 py-1"
              >
                {Object.entries(priorityColors).map(([key, color]) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} Priority
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center space-x-3 flex-grow">
              <span
                className={`${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                } cursor-pointer`}
                onClick={() => setIsEditing(true)}
              >
                {task.text}
              </span>
              <span
                className={`h-3 w-3 rounded-full bg-${
                  priorityColors[task.priority]
                }`}
                title={`${task.priority} priority`}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="text-green-600 hover:text-green-700"
                disabled={!editedText.trim()}
              >
                ✓
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </>
          ) : (
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="text-gray-400 hover:text-red-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-3 pl-8">
          <input
            type="text"
            value={editedLocation}
            onChange={(e) => setEditedLocation(e.target.value)}
            placeholder="Enter location"
            className="border rounded px-2 py-1 text-sm w-full"
          />
        </div>
      ) : (
        task.location && (
          <div className="mt-3 pl-8">
            <button
              onClick={() => setShowWeather(!showWeather)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showWeather ? "Hide Weather" : "Show Weather"}
            </button>
            {showWeather && (
              <WeatherWidget location={task.location} taskId={task.id} />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default TaskItem;
