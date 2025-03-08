import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem"; 

const TaskList = () => {
  const { items: tasks, status, error } = useSelector((state) => state.tasks);

  // Handle loading state
  if (status === "loading") {
    return (
      <div
        className="text-center py-8 text-gray-500"
        aria-live="polite"
        data-testid="task-loading"
      >
        Loading tasks...
      </div>
    );
  }

  // Handle error state
  if (status === "error") {
    return (
      <div
        className="text-center py-8 text-red-500"
        aria-live="assertive"
        data-testid="task-error"
      >
        Error loading tasks: {error}
      </div>
    );
  }

  // Handle empty state
  if (tasks.length === 0) {
    return (
      <div
        className="text-center py-8 text-gray-500"
        aria-live="polite"
        data-testid="task-empty"
      >
        No tasks found. Add a new task!
      </div>
    );
  }

  // Main task list
  return (
    <ul
      className="space-y-4 list-none p-0"
      aria-label="Task list"
      data-testid="task-list"
    >
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
