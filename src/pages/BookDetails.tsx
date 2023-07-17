import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookDetailsButton from "../components/BookDetailsButton";
import BookReviews from "../components/BookReviews";
import BookNotFound from "../components/UI/BookNotFound";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";
import { IErrorResponse } from "../types/response";

export default function BookDetails() {
  const { id } = useParams();

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
            <p className="text-sm">Genre: {bookDetails?.genre}</p>
            <h2 className="text-lg">Author: {bookDetails?.author}</h2>
            <p className="text-base">
              Published: {bookDetails?.publicationDate}
            </p>
          </div>

          <BookDetailsButton book={bookDetails} />
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
