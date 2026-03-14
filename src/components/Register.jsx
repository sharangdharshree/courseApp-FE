import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userSignupService } from "../services/auth.service.js";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
    try {
      await userSignupService({
        fullName,
        email: data.email,
        phone: Number(data.phone),
        password: data.password,
      });
      toast.success("Account created! Please login.");
      navigate("/auth");
    } catch (err) {
      toast.error(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-fit w-131 bg-gradient-to-l from-blue-500 to-cyan-500 rounded-md shadow-2xl flex justify-center items-center p-0.5">
        <div className="w-130 bg-slate-950 rounded-md text-gray-50 flex justify-center items-center flex-col py-10 px-8">
          <h1 className="text-4xl font-medium mb-6">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-row justify-between w-full gap-2">
              <div className="flex flex-col flex-1">
                <label htmlFor="firstName" className="mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-400/50 p-2 rounded-md mb-4 focus:outline-none"
                  placeholder="First Name"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs -mt-3 mb-2">{errors.firstName.message}</p>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="lastName" className="mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-400/50 p-2 rounded-md mb-4 focus:outline-none"
                  placeholder="Last Name"
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs -mt-3 mb-2">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <label htmlFor="email" className="text-left w-full mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-4 focus:outline-none"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-400 text-xs -mt-3 mb-2 w-full">{errors.email.message}</p>
            )}

            <label htmlFor="phone" className="text-left w-full mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-4 focus:outline-none"
              placeholder="10-digit mobile number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: { value: /^\d{10}$/, message: "Enter a valid 10-digit number" },
              })}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs -mt-3 mb-2 w-full">{errors.phone.message}</p>
            )}

            <label htmlFor="password" className="w-full text-left mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-4 focus:outline-none"
              placeholder="Min 6 chars, include letter, number & special char"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            />
            {errors.password && (
              <p className="text-red-400 text-xs -mt-3 mb-2 w-full">{errors.password.message}</p>
            )}

            <label htmlFor="confirmPassword" className="w-full text-left mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full bg-gray-400/50 rounded-md p-2 mb-6 focus:outline-none"
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => val === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs -mt-5 mb-3 w-full">{errors.confirmPassword.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md p-2 hover:from-blue-600 hover:to-cyan-600 w-full disabled:opacity-60 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
            <p className="text-center mt-4 w-full">
              Already Registered?{" "}
              <Link to="/auth" className="font-medium text-cyan-300">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
