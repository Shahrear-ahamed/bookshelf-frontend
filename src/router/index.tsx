import { createBrowserRouter } from "react-router-dom";
import Book from "../Book";
import Layout from "../Layout";
import AddNewBook from "../pages/AddNewBook";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import Blogs from "../pages/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
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
    path: "/all-book",
    element: (
      <Layout>
        <Book />,
      </Layout>
    ),
  },
  {
    path: "/add-new-book",
    element: (
      <Layout>
        <AddNewBook />
      </Layout>
    ),
  },
  {
    path: "/blogs",
    element: (
      <Layout>
        <Blogs />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
