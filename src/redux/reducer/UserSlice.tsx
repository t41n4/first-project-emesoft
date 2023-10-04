import { IUser } from "@/common/user";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialState = {
  loading: boolean;
  users: IUser[];
  error: string;

  singleUser: IUser;
};

const initial: initialState = {
  loading: true,
  users: [],
  singleUser: {
    id: 0,
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: 0,
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: 0,
  },
  error: "",
};

export const fetchUsers = createAsyncThunk("products/fetchUsers", async () => {
  return fetch(`https://fakestoreapi.com/users`)
    .then((res) => {
      return res.json();
    })
    .then((json) => json);
});

export const fetchUsersByID = createAsyncThunk(
  "products/fetchUsersByID",
  async (id: number) => {
    return fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => json);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {
    // clear user
    clearUser: (state) => {
      state.singleUser = initial.singleUser;
    },
  },
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

    // fetchUsersByID
    builder.addCase(fetchUsersByID.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchUsersByID.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.singleUser = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsersByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
