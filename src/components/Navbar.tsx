import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  class?: string;
};

// Profile Dropdown
const ProfileDropDown = (props: Props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);

  const navigation = [{ title: "Dashboard", path: "/dashboard" }];

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setState(false);
    };
    document.addEventListener("click", handleDropDown);

    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className={`relative ${props.class!}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}>
          <img
            src="https://randomuser.me/api/portraits/men/46.jpg"
            className="w-full h-full rounded-full"
          />
        </button>
        <div className="lg:hidden">
          <span className="block">Micheal John</span>
          <span className="block text-sm text-gray-500">john@gmail.com</span>
        </div>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}>
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              to={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
        <li>
          <button className="block w-full text-start text-gray-600 lg:hover:bg-gray-50 lg:p-2.5">
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
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

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const profileState = false;

  const navigation = [{ title: "All books", path: "/all-books" }];
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
              <ul className="mt-12 mb-5 md:mb-0 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigation.map((item, idx) => (
                  <li key={idx} className="text-gray-900 hover:text-gray-900">
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>

              {/* // set profile or login button in dropdown */}
              {profileState ? (
                <ProfileDropDown class="mt-5 pt-5 border-t md:hidden" />
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
              {profileState ? (
                <ProfileDropDown class="hidden md:block" />
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
