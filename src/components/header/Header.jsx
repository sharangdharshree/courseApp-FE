import React from "react";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="bg-transparent text-gray-200 flex flex-row justify-between items-center p-2 shadow-2xl">
      <div className="mx-2">
        <a href="">
          <img src={logo} alt="logo" className="h-10 p-1" />
        </a>
      </div>
      <div>
        <nav className="mx-2">
          <ul className="flex flex-row justify-between items-center">
            <li className="p-2 border-b-1 border-b-slate-950 hover:border-b-1 hover:border-b-cyan-600">
              <a href="">Home</a>
            </li>
            <li className="p-2 border-b-1 border-b-slate-950 hover:border-b-1 hover:border-b-cyan-600">
              <a href="">Courses</a>
            </li>
            <li className="p-2 group relative hover:cursor-pointer ">
              About Us
              <div className="hidden group-hover:block group-hover:flex group-hover:flex-col group-hover:bg-gray-800 rounded-md w-27 p-2 absolute">
                <a href="" className="hover:bg-gray-700 rounded ">
                  Who are we?
                </a>
                <a href="" className="hover:bg-gray-700 rounded">
                  Contact Us
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row justify-between">
        <button className="mx-2 w-18 p-1 rounded-md bg-gradient-to-r  from-blue-600 hover:from-blue-700 to-cyan-600 hover:to-cyan-700 hover:cursor-pointer hover:bg-blue-700">
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;
