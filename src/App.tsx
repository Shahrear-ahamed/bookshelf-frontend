import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./redux/hook";
import { setUserData } from "./redux/features/user/userSlice";

function App() {
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
      <Footer />
    </>
  );
}

export default App;
