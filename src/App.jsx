import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Header, Footer, Spinner } from "./components/index.js";
import { login, logout } from "./redux/features/authSlice.js";
import { refreshUserAccessTokenService } from "./services/auth.service.js";

function App() {
  const dispatch = useDispatch();
  const authChecked = useSelector((state) => state.auth.authChecked);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await refreshUserAccessTokenService();
        dispatch(login(response.data.user));
      } catch {
        dispatch(logout());
      }
    };
    restoreSession();
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
