import { IUser } from "../redux/features/user/userSlice";
import { IBook } from "./book";

export interface IBookDetailsButtonProps {
  book: IBook;
  user: IUser;
}
