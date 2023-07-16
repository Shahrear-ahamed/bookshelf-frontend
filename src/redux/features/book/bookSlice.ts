import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/book";

interface IInitialBookState {
  editableBook: IBook | null;
}

const initialState: IInitialBookState = {
  editableBook: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setEditableBook: (state, action: PayloadAction<IBook>) => {
      state.editableBook = action.payload;
    },
    clearEditableBook: (state) => {
      state.editableBook = null;
    },
  },
});

export const { setEditableBook, clearEditableBook } = bookSlice.actions;

export default bookSlice.reducer;
