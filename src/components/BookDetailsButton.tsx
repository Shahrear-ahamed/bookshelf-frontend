import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteBookMutation } from "../redux/features/book/bookApi";
import { setEditableBook } from "../redux/features/book/bookSlice";
import { useAddWishListMutation } from "../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/book";
import { IErrorResponse } from "../types/response";
import Modal from "./UI/Modal";

function BookDetailsButton({ book }: { book: IBook }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // add to wishlist
  const [
    addWishList,
    { isError: wishIsError, isSuccess: wishIsSuccess, error: wishError },
  ] = useAddWishListMutation();
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();

  // delete book

  // handle user wishlist button UI interaction
  const handleWishlist = () => {
    if (user?.email) {
      const wishBook = { bookId: book._id };
      addWishList(wishBook);
    } else {
      toast.warning("Please login to add to wishlist");
    }
  };

  // handle user wishlist button UI interaction
  if (wishIsSuccess) toast.success("Added to wishlist");

  // handle user edit and delete
  const handleEdit = () => {
    if (user?.email === book.publisher) {
      dispatch(setEditableBook(book));
      navigate("/edit-book");
    }
  };

  const handleDelete = () => {
    if (user?.email === book.publisher) {
      deleteBook(book._id);
    }
  };

  useEffect(() => {
    if (wishIsError) {
      const wishListError = wishError as IErrorResponse;
      toast.error(wishListError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Book deleted");
      setIsOpen(false);
      navigate("/");
    }
  }, [isSuccess, navigate, wishError, wishIsError]);

  return (
    <div className="flex justify-between mb-10">
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

      {user?.email === book?.publisher && (
        <>
          <button
            onClick={handleEdit}
            className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
            Edit
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-3 text-white duration-150 bg-red-600 rounded-lg hover:bg-red-700 active:shadow-lg">
            Delete
          </button>{" "}
        </>
      )}
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default BookDetailsButton;
