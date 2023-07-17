import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useFinishABookReadingListMutation,
  useGetReadingListQuery,
} from "../redux/features/user/userApi";
import { IReadingBookList } from "../types/book";
import { IErrorResponse } from "../types/response";

export default function MyReadingList() {
  const { data, isLoading, isError, error } = useGetReadingListQuery(undefined);
  const readingList: IReadingBookList[] = data?.data;

  // finish book
  const [
    finishABook,
    {
      isLoading: finishIsLoading,
      isSuccess: finishIsSuccess,
      isError: finishIsError,
      error: finishError,
    },
  ] = useFinishABookReadingListMutation();

  // change status
  const handleStatusChange = async (bookId: string, updatedStatus: string) => {
    await finishABook({ book: bookId, status: updatedStatus });
  };

  useEffect(() => {
    if (isError) {
      const listError = error as IErrorResponse;
      toast.error(listError.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (!finishIsLoading && finishIsSuccess) {
      toast.success("Book marked as finished");
    }

    if (finishIsError) {
      const apiError = finishError as IErrorResponse;
      toast.error(apiError.data.message);
    }
  }, [finishError, finishIsError, finishIsLoading, finishIsSuccess]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl my-8 text-center">My reading book list</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Book image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Genre</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center text-xs md:text-base">
          {readingList.length > 0 &&
            readingList?.map((readingBook: IReadingBookList) => (
              <tr key={readingBook._id} className="border-b">
                <td className="p-2">
                  <Link to={`/book/${readingBook.book._id}`}>
                    <img
                      src="https://m.media-amazon.com/images/I/51AC2+BVowL._SX307_BO1,204,203,200_.jpg"
                      alt={readingBook.book.title}
                      className="w-16 h-16 object-contain m-auto"
                    />
                  </Link>
                </td>
                <td className="p-2">
                  <Link to={`/book/${readingBook.book._id}`}>
                    {readingBook.book.title}
                  </Link>
                </td>
                <td className="p-2">{readingBook.book.genre}</td>
                <td className="p-2">{readingBook.status}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded disabled:cursor-pointer disabled:bg-gray-400 disabled:opacity-50"
                    onClick={() =>
                      handleStatusChange(readingBook.book._id, "finished")
                    }
                    disabled={readingBook.status === "finished"}>
                    Mark as Finished
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {readingList?.length === 0 && (
        <div className="text-center my-2 font-medium">No books found</div>
      )}
    </div>
  );
}
