import { useGetBooksQuery } from "../redux/features/book/bookApi";

function AllBooks() {
  const { data } = useGetBooksQuery(undefined);
  console.log(data);

  return <div>AllBooks</div>;
}

export default AllBooks;
