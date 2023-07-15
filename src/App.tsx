import { ReactNode, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { setUserData } from "./redux/features/user/userSlice";
import { useAppDispatch } from "./redux/hook";

interface IProps {
  children: ReactNode;
}
function App({ children }: IProps) {
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
      <Hero />
      {children}
      <Footer />
    </>
  );
}

export default App;
