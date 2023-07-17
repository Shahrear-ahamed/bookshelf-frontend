import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../redux/features/user/userApi";
import { setUserData } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hook";
import { LoginSignUpResponse } from "../types/loginSignUpResponse";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const location = useLocation();
  const transfer = location?.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginUser, { data, isSuccess, isError }] = useLoginUserMutation();

  const onSubmit = async (userData: LoginFormInputs) => {
    try {
      await loginUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }

    if (isSuccess && !isError) {
      const { data: responseData }: LoginSignUpResponse = data;
      const storeData = { email: responseData.email };

      localStorage.setItem("user", responseData.email);
      localStorage.setItem("token", responseData.accessToken);
      dispatch(setUserData(storeData));

      toast.success("Login successful");
      navigate(transfer);
    }
  }, [data, dispatch, isError, isSuccess, navigate, transfer]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img
            src="/src/assets/bookshelf_logo.svg"
            width={70}
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <Link
                to="/signup"
                state={{ from: transfer }}
                className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-3">
          <div>
            <label className="font-medium">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Log in
          </button>

          <div className="text-center">
            <Link to="/forget-password" className="hover:text-indigo-600">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
