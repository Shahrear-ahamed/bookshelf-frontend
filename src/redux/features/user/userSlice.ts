import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  email: string | null;
}

interface UserState {
  user: IUser;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.user.email = action.payload.email;
    },
    logOut: (state) => {
      localStorage.clear();
      state.user.email = null;
    },
  },
});

export const { setLoading, setUserData, logOut } = userSlice.actions;

export default userSlice.reducer;
