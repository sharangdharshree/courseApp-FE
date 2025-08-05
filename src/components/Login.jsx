import React from "react";

function Login() {
  return (
    <div className="h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-gradient-to-l from-blue-500 to-cyan-500 h-121 w-131 flex justify-center items-center rounded-md shadow-2xl">
        <div className="h-120 w-130 shadow-2xl rounded-md text-gray-50 flex justify-center items-center flex-col bg-slate-950">
          <h1 className="text-4xl font-medium mb-4">Login</h1>
          <form action="" className="flex flex-col items-center w-105">
            <label htmlFor="email" className="mb-2 w-full">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="focus:outline-none bg-slate-400/50 rounded-md p-2 mb-4 w-full"
              required
            />

            <div className="flex justify-between flex-row mb-2 w-full">
              <label htmlFor="password" className="">
                Password
              </label>
              <p>
                <a href="" className="font-medium text-cyan-300">
                  Forgot Password?
                </a>
              </p>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              required
              className="focus:outline-none bg-slate-400/50 rounded-md p-2 mb-6 w-full"
            />
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md p-2 hover:from-blue-600 hover:to-cyan-600 w-25">
              Login
            </button>
            <p className="text-center mt-8 w-full">
              Not Registered?{" "}
              <a href="" className="font-medium text-cyan-300">
                Register Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
