import { useSearchParams } from "react-router-dom";
import BookCard from "../components/UI/BookCard";
import { useGetSearchBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/book";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("searchTerm");
  const { data, isLoading } = useGetSearchBooksQuery(query as string);

  const books: IBook[] = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full justify-between">
        <div>Search result for: {query} </div>
      </div>

      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {books?.length > 0 &&
          books?.map((book) => (
            <div
              key={book._id}
              className="group relative p-2 rounded-lg card__shadow">
              <BookCard book={book} />
            </div>
          ))}
      </div>

      {books?.length === 0 && (
        <div className="my-10 w-full text-center text-lg">No result found</div>
      )}
    </>
  );
};

export default SearchResult;
