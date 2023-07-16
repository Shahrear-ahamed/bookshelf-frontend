import { Link } from "react-router-dom";

export default function BookNotFound() {
  return (
    <div className="max-w-screen-xl mx-auto my-20 px-4 flex items-center justify-center md:px-8">
      <div className="mt-12 max-w-lg space-y-3 md:mt-0">
        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          Page not found
        </p>
        <p className="text-gray-600">Sorry, Your book not found .</p>
        <Link
          to="/"
          className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
          Go back
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}