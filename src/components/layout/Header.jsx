import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              DoIt
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6 text-white/80" />
                <span className="text-sm font-medium text-white/90 drop-shadow-sm">
                  Welcome, {user.email.split("@")[0]}
                </span>
              </div>

              <button
                onClick={() => dispatch(logout())}
                className="flex items-center space-x-1.5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
