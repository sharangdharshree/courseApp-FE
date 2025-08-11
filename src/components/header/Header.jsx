import React, { useState } from "react";
import { logo, user } from "../../assets/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout as authLogout } from "../../redux/features/authSlice.js";
import { userLogoutService } from "../../services/auth.service.js";
import toast, { Toaster } from "react-hot-toast";

function Header() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var auth = useSelector((state) => state.auth.isAuthenticated);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await userLogoutService();
      if (response.success) {
        dispatch(authLogout());
        toast.success("Logout successful", { position: "top-right" });
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-transparent text-gray-50 flex flex-row justify-between items-center p-2 shadow-2xl">
      <div className="mx-2">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-10 p-1" />
        </Link>
      </div>
      <div>
        <nav className="mx-2">
          <ul className="flex flex-row justify-between items-center">
            <li className="p-2 border-b-1 border-b-slate-950 hover:border-b-1 hover:border-b-cyan-600">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="p-2 border-b-1 border-b-slate-950 hover:border-b-1 hover:border-b-cyan-600">
              <NavLink to={"/courses"}>Courses</NavLink>
            </li>
            <li className="p-2 group relative hover:cursor-pointer ">
              About Us
              <div className="hidden group-hover:block group-hover:flex group-hover:flex-col group-hover:items-center group-hover:bg-gray-800 rounded-md w-27 p-2 absolute space-y-2">
                <Link to={"/"} className="hover:bg-gray-700 rounded p-1">
                  Our Story
                </Link>
                <Link to={"/"} className="hover:bg-gray-700 rounded p-1">
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row justify-between">
        {auth ? (
          <ol className="px-2">
            <li className="group relative hover:cursor-pointer">
              <img
                src={user}
                alt=""
                className="h-10 p-2 rounded-md shadow-xl"
              />
              <div className="hidden group-hover:block group-hover:flex group-hover:flex-col group-hover:items-center group-hover:bg-gray-800 rounded-md w-24 p-2 absolute right-2 space-y-3 ">
                <Link className="hover:bg-gray-700 rounded p-2">Account</Link>
                <Link className="hover:bg-gray-700 rounded p-2">Helpdesk</Link>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="hover:bg-gray-700 rounded p-2"
                >
                  Logout
                </button>
              </div>
            </li>
          </ol>
        ) : (
          <Link to={"/auth"}>
            <button className="mx-2 w-18 p-1.5 rounded-sm text-sm font-medium bg-gradient-to-r  from-blue-600 hover:from-blue-700 to-cyan-600 hover:to-cyan-700 hover:cursor-pointer hover:bg-blue-700">
              Login
            </button>
          </Link>
        )}
      </div>
      <Toaster />
    </header>
  );
}

export default Header;
