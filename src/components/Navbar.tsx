import { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

type Props = {
  class?: string;
};

// Login Button
const LoginButton = (props: Props) => {
  return (
    <div
      className={`gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 ${
        props.class as string
      }`}>
      <Link
        to="/login"
        className="py-3 px-4 w-full md:w-28 text-center text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-md shadow block lg:inline">
        Log in
      </Link>
    </div>
  );
};

// Log out Button
const LogOutButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div
      onClick={handleLogout}
      className={`gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 cursor-pointer ${
        props.class as string
      }`}>
      <span className="py-3 px-4 w-full md:w-28 text-center text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-md shadow block lg:inline">
        Log out
      </span>
    </div>
  );
};

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const navigation = [
    { title: "All books", path: "/all-books" },
    { title: "Blogs", path: "/blogs" },
  ];

  if (user?.email) {
    const userNavigation = [
      { title: "My books", path: "/my-books" },
      { title: "Add New Book", path: "/add-new-book" },
    ];
    navigation.push(...userNavigation);
  }

  return (
    <>
      <nav className="fixed w-full top-0 blur__effect">
        <div className="flex items-center space-x-8 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
          <div className="flex-none lg:flex-initial">
            <Link to="/">
              <img
                src="/src/assets/bookshelf_logo.svg"
                width={60}
                height={55}
                alt="Bookshelf logo"
              />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div
              className={`absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                menuState ? "" : "hidden"
              }`}>
              <ul className="mt-12 mb-5 md:mb-0 space-y-5 lg:flex lg:justify-center lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigation.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-900 hover:text-[#6159E7] duration-300">
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>

              {/* // set profile or login button in dropdown */}
              {user?.email ? (
                <LogOutButton class="mt-5 pt-5 border-t md:hidden" />
              ) : (
                <LoginButton class="mt-5 pt-5 border-t md:hidden" />
              )}
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              <form className="flex text-sm items-center space-x-2 border rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-none text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  className="w-full bg-transparent outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                  type="text"
                  placeholder="Search"
                />
              </form>

              {/* // set profile or login button in bar */}
              {user?.email ? (
                <LogOutButton class="hidden md:block" />
              ) : (
                <LoginButton class="hidden md:block" />
              )}

              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuState(!menuState)}>
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-[76px]"></div>
    </>
  );
};

export default Navbar;
