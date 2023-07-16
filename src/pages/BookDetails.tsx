import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookNotFound from "../components/UI/BookNotFound";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { useAddWishListMutation } from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/book";
import { IErrorResponse } from "../types/response";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const [
    addWishList,
    { isError: wishIsError, isSuccess: wishIsSuccess, error: wishError },
  ] = useAddWishListMutation();

  const { data, isLoading, isSuccess, isError, error } = useGetSingleBookQuery(
    id as string
  );

  const bookDetails: IBook = data?.data;

  if (isLoading && !isSuccess) return <div>Loading...</div>;

  if (data?.data === null) return <BookNotFound />;

  if (isError) {
    const getBookError = error as IErrorResponse;
    toast.error(getBookError?.data?.message);
  }

  const handleWishlist = () => {
    if (user?.email) {
      const wishBook = { bookId: bookDetails._id };
      addWishList(wishBook);
    } else {
      toast.warning("Please login to add to wishlist");
    }
  };

  // handle user wishlist button UI interaction
  if (wishIsSuccess) toast.success("Added to wishlist");
  if (wishIsError) {
    const wishListError = wishError as IErrorResponse;
    toast.error(wishListError?.data?.message);
  }

  const handleEdit = () => {
    if (user?.email === bookDetails.publisher) {
      console.log("edit");
    }
  };

  const handleDelete = () => {
    if (user?.email === bookDetails.publisher) {
      console.log("delete");
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full md:w-3/4 mx-auto my-10 gap-10">
        <div className="h-full w-1/2">
          <img
            src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
            alt={bookDetails?.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-2xl"
          />
        </div>

        {/* details  */}

        <div className="w-1/2 flex flex-col justify-between">
          <div className="flex py-5 flex-col">
            <h3 className="text-4xl font-medium mb-2">{bookDetails?.title}</h3>
            <h2 className="text-lg">author: {bookDetails?.author}</h2>
            <p className="text-lg">{bookDetails?.genre}</p>
          </div>

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

            {user?.email === bookDetails?.publisher && (
              <>
                <button
                  onClick={handleEdit}
                  className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-3 text-white duration-150 bg-red-600 rounded-lg hover:bg-red-700 active:shadow-lg">
                  Delete
                </button>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
