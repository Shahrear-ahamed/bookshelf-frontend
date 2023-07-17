import { Link } from "react-router-dom";
import { useGetMyBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";

export default function MyBooks() {
  const { data, isLoading, isSuccess } = useGetMyBooksQuery(undefined);

  const books = data?.data;

  if (isLoading && !isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Book image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Genre</th>
              <th className="p-2">Publication Date</th>
              <th className="p-2">Author</th>
            </tr>
          </thead>
          <tbody className="text-center text-xs md:text-base">
            {books.length > 0 &&
              books?.map((book: IBook) => (
                <tr key={book._id} className="border-b">
                  <td className="p-2">
                    <Link to={`/book/${book._id}`}>
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
                        alt={book.title}
                        className="w-16 h-16 object-contain m-auto"
                      />
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link to={`/book/${book._id}`}>{book.title}</Link>
                  </td>
                  <td className="p-2">{book.genre}</td>
                  <td className="p-2">{book.publicationDate}</td>
                  <td className="p-2">{book.author}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <div className="text-center my-2 font-medium">No books found</div>
        )}
      </div>
    </div>
  );
}
