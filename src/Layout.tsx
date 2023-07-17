import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { setLoading, setUserData } from "./redux/features/user/userSlice";
import { useAppDispatch } from "./redux/hook";

function Layout() {
  const dispatch = useAppDispatch();
  dispatch(setLoading(true));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUserData({ email: user }));
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default Layout;
