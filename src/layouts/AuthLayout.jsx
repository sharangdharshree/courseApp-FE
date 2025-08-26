import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authRequired = true }) {
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authRequired && !authStatus) {
      navigate("/login");
    } else if (!authRequired && authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate, authRequired]);

  return <>{children}</>;
}
