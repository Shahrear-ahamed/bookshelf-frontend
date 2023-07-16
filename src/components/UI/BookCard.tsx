import { Link } from "react-router-dom";
import { IBook } from "../../types/book";

function BookCard({ book }: { book: IBook }) {
  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-3 p-1">
        <h3 className="text-lg text-gray-700">
          <Link to={book._id}>
            <span aria-hidden="true" className="absolute inset-0" />
            {book.title}
          </Link>
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
