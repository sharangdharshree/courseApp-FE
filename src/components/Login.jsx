import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../redux/features/authSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { userLoginService } from "../services/auth.service.js";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await userLoginService(data);

      if (response.success) {
        dispatch(authLogin(response.data.user));
        toast.success("Login successful", { position: "top-right" });
        navigate("/");
      } else {
        console.log(re);
      }
    } catch (err) {
      // If error is field-specific
      if (err?.field) {
        setError(err.field, { type: "manual", message: err.message });
      } else {
        // Global form error message
        toast.error(err?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-gradient-to-l from-blue-500 to-cyan-500 h-121 w-131 flex justify-center items-center rounded-md shadow-2xl">
        <div className="h-120 w-130 shadow-2xl rounded-md text-gray-50 flex justify-center items-center flex-col bg-slate-950">
          <h1 className="text-4xl font-medium mb-4">Login</h1>
          <form
            onSubmit={handleSubmit(login)}
            className="flex flex-col items-center w-105"
          >
            <label htmlFor="email" className="mb-2 w-full">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="focus:outline-none bg-slate-400/50 rounded-md p-2 mb-4 w-full"
              required
              {...register("email", {
                required: true,
              })}
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
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="focus:outline-none bg-slate-400/50 rounded-md p-2 mb-6 w-full"
              {...register("password", {
                required: true,
              })}
            />
            <button
              className={`rounded-md p-2 w-25 bg-gradient-to-r from-blue-500 to-cyan-500 ${
                loading
                  ? "from-blue-600/50 to-cyan-600/50 cursor-not-allowed w-30"
                  : "  hover:from-blue-600 hover:to-cyan-600"
              }  `}
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : " Login"}
            </button>
            <Toaster />
            <p className="text-center mt-8 w-full">
              Not Registered?{" "}
              <Link to={"/auth/register"} className="font-medium text-cyan-300">
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
