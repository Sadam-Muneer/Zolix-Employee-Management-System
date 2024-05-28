import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex">
      <div className="sidebar bg-black h-screen fixed top-0 left-0 w-48 overflow-auto ">
        <button className="text-lg font-semibold text-white py-3 px-3">
          Zolix Employees
        </button>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link
              to="/"
              className="nav-link text-white px-0 align-middle hover:text-orange-500"
            >
              <span className="ms-1 hidden sm:inline px-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/employee"
              className="nav-link px-0 align-middle text-white hover:text-orange-500"
            >
              <span className="ms-1 hidden sm:inline px-3">
                Manage Employees
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="nav-link px-0 align-middle text-white hover:text-orange-500"
            >
              <span className="ms-1 hidden sm:inline px-3">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              className="nav-link px-0 align-middle text-white hover:text-orange-500"
            >
              <span className="ms-1 hidden sm:inline px-3">Feedback</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-full p-2">
        <div className="hidden md:flex justify-center py-2 shadow">
          <h1>Zolix Employee Management System</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
