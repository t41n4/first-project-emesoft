import { IUser } from "@/common/user";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialState = {
  loading: boolean;
  users: IUser[];
  error: string;
};

const initial: initialState = {
  loading: true,
  users: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("products/fetchUsers", async () => {
  return fetch(`https://fakestoreapi.com/users`)
    .then((res) => {
      return res.json();
    })
    .then((json) => json);
});

const userSlice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProductsByID
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default userSlice.reducer;
