import { useNavigate } from "react-router-dom";
import { IBook } from "../../types/book";

function BookCard({ book }: { book: IBook }) {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src="https://m.media-amazon.com/images/I/51AC2+BVowL._SX307_BO1,204,203,200_.jpg"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-3 p-1">
        <h3 onClick={handleBookClick} className="text-lg text-gray-700">
          <span aria-hidden="true" className="absolute inset-0 cursor-pointer" />
          {book.title}
        </h3>
        <h3 className="text-xs font-medium text-gray-900">@{book.author}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm font-medium text-gray-70000">
            {book.publicationDate}
          </p>
          <p className="mt-1 text-sm text-gray-500">{book.genre}</p>
        </div>
      </div>
    </>
  );
}

export default BookCard;
