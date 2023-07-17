import BookCard from "../components/UI/BookCard";
import { useGetHomeBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";

function AllBooks() {
  const { data: booksData, isLoading } = useGetHomeBooksQuery(undefined);
  const books: IBook[] = booksData?.data;

  isLoading && <div>Loading...</div>;

  return (
    <>
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {books?.length > 0 &&
          books?.map((book: IBook) => (
            <div
              key={book._id}
              className="group relative p-2 rounded-lg card__shadow">
              <BookCard book={book} />
            </div>
          ))}
      </div>

      {books?.length === 0 && <div className="text-center">No books found</div>}
    </>
  );
}

export default AllBooks;
