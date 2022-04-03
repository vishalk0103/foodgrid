import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    username: user ? user.username : null,
    token: user ? user.token : null,
    email: user ? user.email : null,
    userId: user ? user.userId : null,
    expiration: user ? user.expiration : null,
  },
  reducers: {
    login(state, action) {
      let data = {
        token: action.payload.token,
        username: action.payload.username,
        email: action.payload.email,
        userId: action.payload.userId,
        expiration: new Date().getTime() + 100,
      };
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      localStorage.setItem("user", JSON.stringify(data));
    },
    logout(state, action) {
      state.email = null;
      state.userId = null;
      state.username = null;
      state.token = null;
      localStorage.clear("user");
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;
