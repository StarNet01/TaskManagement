import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "interface/IUser";
import HttpClient from "services/HttpClient";
import { RootState } from "store/Store";

export interface UserState {
  user: IUser | null;
  token: string;
  loading: boolean;
  errors: object[];
}

const initialState: UserState = {
  user: null,
  token: "",
  loading: false,
  errors: [],
};

const Http = new HttpClient();
export const loginRequestAsync = createAsyncThunk(
  "user/loginRequest",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await Http.post("login", {
      email: email,
      password: password,
    });
    return response.data;
  }
);

export const registerRequestAsync = createAsyncThunk(
  "user/registerRequest",
  async ({ email, password, firstName, lastName }: IUser) => {
    const response = await Http.post("register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    loginError: (state, action: PayloadAction<UserState>) => {
      state.loading = false;
      state.errors = action.payload.errors;
    },

    logout: (state) => {
      state.loading = false;
      state.errors = [];
      state.user = null;
      state.token = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginRequestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = (action.payload as any).accessToken;
        state.user = (action.payload as any).user;
      })
      .addCase(loginRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      })     
      .addCase(registerRequestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = (action.payload as any).accessToken;
        state.user = (action.payload as any).user;
      })
      .addCase(registerRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as any;
      });



  },
});

export const { loginError, loginRequest, loginSuccess, logout } =
  userSlice.actions;

export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
