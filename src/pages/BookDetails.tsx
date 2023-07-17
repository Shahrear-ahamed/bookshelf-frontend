import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookReviews from "../components/BookReviews";
import EditAndDeleteButton from "../components/EditAndDeleteButton";
import BookNotFound from "../components/UI/BookNotFound";
import WishAndReadingList from "../components/WishAndReadingList";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/book";
import { IErrorResponse } from "../types/response";

export default function BookDetails() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);

  // get single book
  const { data, isLoading, isSuccess, isError, error } = useGetSingleBookQuery(
    id as string,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  const bookDetails: IBook = data?.data;

  useEffect(() => {
    if (isError) {
      const getBookError = error as IErrorResponse;
      toast.error(getBookError?.data?.message);
    }
  }, [error, isError]);

  // send it in after useEffect because it gives error
  if (isLoading && !isSuccess) return <div>Loading...</div>;
  if (data?.data === null) return <BookNotFound />;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mx-auto my-10 gap-10">
        <div className="h-full w-3/5 md:w-1/2 mx-auto">
          <img
            src="https://m.media-amazon.com/images/I/51AC2+BVowL._SX307_BO1,204,203,200_.jpg"
            alt={bookDetails?.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-2xl"
          />
        </div>

        {/* details  */}

        <div className="w-5/6 md:w-1/2 mx-auto flex flex-col justify-between">
          <div className="flex py-5 flex-col">
            <h3 className="text-4xl font-medium mb-2">{bookDetails?.title}</h3>
            <p className="text-sm">Genre: {bookDetails?.genre}</p>
            <h2 className="text-base">Author: {bookDetails?.author}</h2>
            <p className="text-base">
              Published: {bookDetails?.publicationDate}
            </p>
          </div>

          <div className="">
            <WishAndReadingList book={bookDetails} user={user} />
            <EditAndDeleteButton book={bookDetails} user={user} />
          </div>
        </div>
      </div>

      {/* // book review  */}
      <div className="w-full md:w-3/4 mx-auto my-10">
        <p className="text-xl inline-block font-medium mb-2 border-b-2 pb-1 border-blue-500">
          Reviews
        </p>
        <BookReviews bookId={id as string} reviews={bookDetails.reviews} />
      </div>
    </div>
  );
}
