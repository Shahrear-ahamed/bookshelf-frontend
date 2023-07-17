import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGiveReviewMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";

interface IBookReviewsProps {
  bookId: string;
  reviews: string[];
}

interface IReviewForm {
  review: string;
}

export default function BookReviews({ reviews, bookId }: IBookReviewsProps) {
  const user = useAppSelector((state) => state.user.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();
  const [giveReview, { isSuccess, isError }] = useGiveReviewMutation();

  const onSubmit = (reviewData: IReviewForm) => {
    const myReview = {
      id: bookId,
      ...reviewData,
    };

    giveReview(myReview);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success("Review added successfully");
      reset();
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isSuccess, reset]);

  return (
    <div className="container mx-auto py-5">
      {user.email ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="w-full flex flex-col md:flex-row items-end">
            <textarea
              className="flex-grow w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Write your review..."
              {...register("review", {
                required: "Review must be required",
              })}></textarea>

            <button
              type="submit"
              className="h-14 mt-4 md:mt-0 ml-0 md:ml-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              Submit Review
            </button>
          </div>
          {errors.review && (
            <span className="text-red-400 text-xs">
              {errors.review.message}
            </span>
          )}
        </form>
      ) : (
        <p className="text-red-400 text-xs">
          You must be logged in to give review
        </p>
      )}
      <div className="mt-10">
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="mb-4 py-2 px-6 border rounded-full flex gap-8 items-center">
                <img
                  src="https://github.com/shadcn.png"
                  alt="user image"
                  className="rounded-full h-10 w-10 object-cover object-center"
                />
                <p>{review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to write a review!</p>
        )}
      </div>
    </div>
  );
}
