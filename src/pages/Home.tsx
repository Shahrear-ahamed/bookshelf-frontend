import Hero from "../components/Hero";
import BookCard from "../components/UI/BookCard";
import { useGetHomeBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";

function Home() {
  const { data: booksData, isLoading } = useGetHomeBooksQuery(undefined);
  const books = booksData?.data;
  isLoading && <div>Loading...</div>;
  return (
    <>
      <Hero />
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {books?.map((book: IBook) => (
          <div
            key={book._id}
            className="group relative p-2 rounded-lg card__shadow">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
