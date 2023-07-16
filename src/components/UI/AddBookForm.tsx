import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNewBookMutation } from "../../redux/features/book/bookApi";
import { useAppSelector } from "../../redux/hook";

interface NewBookFormInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
  publisher: string;
}

export default function AddBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewBookFormInputs>();
  const { user } = useAppSelector((state) => state.user);
  const [addNewBook, { isSuccess, isError }] = useAddNewBookMutation();

  const onSubmit = async (bookData: NewBookFormInputs) => {
    try {
      bookData["publicationDate"] = Number(bookData["publicationDate"]);
      bookData["publisher"] = user.email as string;

      await addNewBook(bookData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success("Book added successfully");
      reset();
    }
  }, [isError, isSuccess, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add your new book
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900">
              Book Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                autoComplete="title"
                {...register("title", { required: "Title is required" })}
                className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors.title && (
                <span className="text-red-400 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-gray-900">
              Author
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="author"
                autoComplete="author"
                {...register("author", { required: "Author is required" })}
                className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors.author && (
                <span className="text-red-400 text-xs">
                  {errors.author.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="genre"
              className="block text-sm font-medium leading-6 text-gray-900">
              Genre
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="genre"
                autoComplete="genre"
                {...register("genre", { required: "Genre is required" })}
                className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors.genre && (
                <span className="text-red-400 text-xs">
                  {errors.genre.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="publicationDate"
              className="block text-sm font-medium leading-6 text-gray-900">
              Publication Date
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="publicationDate"
                maxLength={4}
                autoComplete="publicationDate"
                {...register("publicationDate", {
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Please enter a valid year",
                  },
                })}
                className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              {errors.publicationDate && (
                <span className="text-red-400 text-xs">
                  {errors.publicationDate.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover"
              className="block text-sm font-medium leading-6 text-gray-900">
              Book photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG up to 1MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  );
}
