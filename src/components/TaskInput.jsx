import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import { FaPlusCircle } from "react-icons/fa";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: Date.now(), text: task, priority }));
      setTask("");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={handleAddTask}
        className="w-full mt-2 p-2 bg-blue-500 text-white rounded flex items-center gap-2 justify-center"
      >
        <FaPlusCircle /> Add Task
      </button>
    </div>
  );
};

export default TaskInput;
