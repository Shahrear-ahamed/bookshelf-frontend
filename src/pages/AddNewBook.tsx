import AddBookForm from "../components/UI/AddBookForm";

function AddNewBook() {
  return (
    <section className="px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <AddBookForm />
      <div>
        <h2>My Books</h2>
      </div>
    </section>
  );
}

export default AddNewBook;
