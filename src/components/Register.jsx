import React from "react";

function Register() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-121 w-131 bg-gradient-to-l from-blue-500 to-cyan-500 rounded-md shadow-2xl flex justify-center items-center">
        <div className="h-120 w-130 bg-slate-950 rounded-md text-gray-50 flex justify-center items-center flex-col">
          <h1 className="text-4xl font-medium mb-4">Register</h1>
          <form action="" className="flex flex-col items-center">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col mr-1">
                <label htmlFor="first" className="mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full bg-gray-400/50 p-2 rounded-md mb-4 focus:outline-none"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex flex-col ml-1">
                <label htmlFor="lastName" className="mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full bg-gray-400/50 p-2 rounded-md mb-4 focus:outline-none"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <label htmlFor="email" className="text-left w-full mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-4 focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password" className="w-full text-left mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-2 focus:outline-none"
              placeholder="Enter your password"
              required
            />
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-4 focus:outline-none"
              required
            />
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md p-2 hover:from-blue-600 hover:to-cyan-600 w-25">
              Register
            </button>
            <p className="text-center mt-4 w-full">
              Already Registered?{" "}
              <a href="" className="font-medium text-cyan-300">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
