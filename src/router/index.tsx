import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Book from "../Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
