import {createSlice} from '@reduxjs/toolkit';

export const ERROR = {
  "NONE" : 'none',
  "LOGIN" : 'login_error',
  "REGISTER" : 'register_error'
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: '',
    calling: false,
    error: ERROR['NONE'],
    confirmed: false,
    pin: ''
  },
  reducers: {
    login: (state, {email, password}) => {
      state.calling = true;
    },
    register: (state, {name, email, password}) => {
      state.calling = true;
    },
    setUser: (state, {payload}) => {
      state.user = payload.user;
      console.log(payload.user);
    },
    setToken: (state, {payload}) => {
      state.token = payload.token;
      state.calling = false;
      console.log(payload.token);
    },
    setError: (state, {payload}) => {
      state.calling = false;
      state.error = payload.error;
    },
    setConfirmed: (state, {payload}) => {
      state.confirmed = payload.confirmed;
    },
    setPin: (state, {payload}) => {
      state.pin = payload.pin;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;