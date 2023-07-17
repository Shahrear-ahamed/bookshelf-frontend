import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteBookMutation } from "../redux/features/book/bookApi";
import { IBookDetailsButtonProps } from "../types/bookProps";
import Modal from "./UI/Modal";

export default function EditAndDeleteButton({
  book,
  user,
}: IBookDetailsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();

  // handle user edit and delete
  const handleEdit = () => {
    if (user?.email === book.publisher) {
      navigate(`/edit-book/${book._id}`);
    }
  };

  const handleDelete = () => {
    if (user?.email === book.publisher) {
      deleteBook(book._id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book deleted");
      setIsOpen(false);
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <div className="w-full flex justify-end gap-10 mt-5">
      {user?.email === book?.publisher && (
        <>
          <button
            onClick={handleEdit}
            className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
            Edit
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-3 text-white duration-150 bg-red-600 rounded-lg hover:bg-red-700 active:shadow-lg">
            Delete
          </button>
        </>
      )}

      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
