import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header";
import LoginForm from "./components/auth/LoginForm";
import TaskInput from "./components/tasks/TaskInput";
import TaskList from "./components/tasks/TaskList";
import PrivateRoute from "./components/auth/PrivateRoute";
import Sidebar from "./components/layout/Sidebar";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar - Only visible when authenticated */}
        {isAuthenticated && (
          <div className="p-1 rounded hidden md:block bg-grey-200 shadow-md">
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <TaskInput />
                  <TaskList />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
