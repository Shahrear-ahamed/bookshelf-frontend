import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Book from "../Book";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Home />
      </App>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
