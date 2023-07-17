import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    useAddReadingListMutation,
    useAddWishListMutation,
} from "../redux/features/user/userApi";
import { IBookDetailsButtonProps } from "../types/Props";
import { IErrorResponse } from "../types/response";

export default function WishAndReadingList({
  book,
  user,
}: IBookDetailsButtonProps) {
  // add to wishlist
  const [
    addWishList,
    { isError: wishIsError, isSuccess: wishIsSuccess, error: wishError },
  ] = useAddWishListMutation();

  // reading book list
  const [addReadingList, { isError, isSuccess: readingIsSuccess, error }] =
    useAddReadingListMutation();

  // handle user wishlist button UI interaction
  const handleWishlist = () => {
    if (user?.email) {
      const wishBook = { bookId: book._id };
      addWishList(wishBook);
    } else {
      toast.warning("Please login to add to wishlist");
    }
  };

  // handle add to reading list
  const handleReadingList = () => {
    if (user?.email) {
      const readingBook = { bookId: book._id, status: "reading" };

      addReadingList(readingBook);
    } else {
      toast.warning("Please login to add to reading list");
    }
  };

  useEffect(() => {
    if (wishIsError) {
      const wishListError = wishError as IErrorResponse;
      toast.error(wishListError?.data?.message);
    }

    // handle user wishlist button UI interaction
    if (wishIsSuccess) toast.success("Added to wishlist");
  }, [wishError, wishIsError, wishIsSuccess]);

  useEffect(() => {
    if (readingIsSuccess && !isError) {
      toast.success("Added to reading list");
    }

    if (isError) {
      const readingListError = error as IErrorResponse;
      toast.error(readingListError?.data?.message);
    }
  }, [error, isError, readingIsSuccess]);

  return (
    <div className="flex justify-between w-full">
      <button
        onClick={handleWishlist}
        className="flex items-center gap-2 px-5 py-3 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
        Add to wishlist
      </button>

      <button
        onClick={handleReadingList}
        className="flex items-center gap-2 px-5 py-3 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
        Add for reading
      </button>
    </div>
  );
}
