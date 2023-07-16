interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = ({ isOpen, onCancel, onConfirm }: ModalProps) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete this book?
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mr-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={onCancel}>
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
