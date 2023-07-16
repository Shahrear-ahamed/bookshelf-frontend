import { ReactNode, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { setUserData } from "./redux/features/user/userSlice";
import { useAppDispatch } from "./redux/hook";

interface IProps {
  children: ReactNode;
}
function Layout({ children }: IProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUserData({ email: user }));
    }
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
        {children}
      </section>
      <Footer />
    </>
  );
}

export default Layout;
