import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  AuthOutlet,
  Login,
  Register,
  Courses,
  Course,
  CourseLearn,
  MyCourses,
  MyAccount,
} from "./components/index.js";
import AuthLayout from "./layouts/AuthLayout.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <AuthOutlet />,
        children: [
          {
            path: "/auth",
            element: (
              <AuthLayout authRequired={false}>
                <Login />
              </AuthLayout>
            ),
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/course/:id",
        element: <Course />,
      },
      {
        path: "/course/:id/learn",
        element: <CourseLearn />,
      },
      {
        path: "/my-courses",
        element: (
          <AuthLayout authRequired={true}>
            <MyCourses />
          </AuthLayout>
        ),
      },
      {
        path: "/my-account",
        element: (
          <AuthLayout authRequired={true}>
            <MyAccount />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.VITE_NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
