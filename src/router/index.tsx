import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import AddNewBook from "../pages/AddNewBook";
import AllBooks from "../pages/AllBooks";
import Blogs from "../pages/Blogs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";

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
    path: "/all-books",
    element: (
      <Layout>
        <AllBooks />
      </Layout>
    ),
  },
  {
    path: "/add-new-book",
    element: (
      <Layout>
        <AddNewBook />
      </Layout>
    )
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
