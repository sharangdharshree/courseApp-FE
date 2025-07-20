import { useEffect, useState, useRef } from "react";
import {
  userLoginService,
  userLogoutService,
} from "./services/auth.service.js";

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const response = await userLoginService({ email, password });
    setUser(response.data.user);
    setLogin(true);
    //console.log(response);
  };

  const handleLogout = async () => {
    const response = await userLogoutService();
    console.log(response);
    setLogin(false);
    setUser("");
  };

  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          Welcome to CourseWallah!
        </h1>
        <p className="text-lg mt-4">
          This is a simple React application styled with Tailwind CSS.
        </p>
      </div>
      <div>
        {login ? (
          <div className="flex flex-col items-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome, {user.fullName}!
            </h2>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
            <input ref={emailRef} type="text" placeholder="Enter your email" />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
            />
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
