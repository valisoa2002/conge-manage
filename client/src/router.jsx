import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
