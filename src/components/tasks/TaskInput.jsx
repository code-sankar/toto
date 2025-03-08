import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasksSlice";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(
        addTask({
          text: taskText,
          priority,
          location: location.trim(),
        })
      );
      setTaskText("");
      setLocation("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task description"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location for weather (optional)"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
