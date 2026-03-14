import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authRequired = true }) {
  const navigate = useNavigate();
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authChecked) return; // wait for boot check to complete before redirecting

    if (authRequired && !isAuthenticated) {
      navigate("/auth");
    } else if (!authRequired && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, authChecked, navigate, authRequired]);

  return <>{children}</>;
}
