import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { PiNotePencilLight } from "react-icons/pi";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-500 text-white p-4 shadow">
        <h1 className="text-2xl font-bold text-center flex items-center gap-2">
          <PiNotePencilLight /> Advanced To-Do App
        </h1>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl px-4 py-6 flex flex-col items-center">
        {/* Login Section */}
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <FaUserCircle className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold mb-4">Welcome to To-Do App</h2>
            <button
              onClick={() => dispatch(login())}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 flex items-center gap-2"
            >
              <FaSignInAlt /> Login
            </button>
          </div>
        ) : (
          // Task Section
          <div className="w-full">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
            <TaskInput />
            <TaskList />
          </div>
        )}
      </main>
      <h6>
        {" "}
        Made by <b>Vipin Kumar</b>
      </h6>
    </div>
  );
};

export default App;
