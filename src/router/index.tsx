import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import AddNewBook from "../pages/AddNewBook";
import AllBooks from "../pages/AllBooks";
import Blogs from "../pages/Blogs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBooks from "../pages/MyBooks";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import BookDetails from "../pages/BookDetails";

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
    path: "/my-books",
    element: (
      <Layout>
        <MyBooks />
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
    path: "/book/:id",
    element: (
      <Layout>
        <BookDetails />
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
