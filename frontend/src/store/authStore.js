import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
};

 const API_URL= 'http://localhost:3000/api/auth';

// Async actions
const createAsyncAction = (name, asyncFunc) => 
  createAsyncThunk(name, async (data, { rejectWithValue }) => {
    try {
      const response = await asyncFunc(data);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response?.data?.message  });
    }
  });

export const signup = createAsyncAction('signup', (credentials) => axios.post(`${API_URL}/signup`, credentials));
export const login = createAsyncAction('login', (credentials) => axios.post(`${API_URL}/login`, credentials));
export const logout = createAsyncAction('logout', () => axios.post(`${API_URL}/logout`));
export const verifyEmail = createAsyncAction('verify-email', (code) => axios.post(`${API_URL}/verify-email`, { code }));
export const checkAuth = createAsyncAction('check-auth', () => axios.get(`${API_URL}/check-auth`));
export const forgotPassword = createAsyncAction('forgot-password', (email) => axios.post(`${API_URL}/forgot-password`, { email }));
export const resetPassword = createAsyncAction('reset-password', ({ token, password }) => axios.post(`${API_URL}/reset-password/${token}`, { password }));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(signup.fulfilled, (state, action) => { state.user = action.payload.user; state.isAuthenticated = true; state.isLoading = false; })
      .addCase(signup.rejected, (state, action) => { state.error = action.payload.message; state.isLoading = false; })

      .addCase(login.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload.user; state.isAuthenticated = true; state.isLoading = false; })
      .addCase(login.rejected, (state, action) => { state.error = action.payload.message; state.isLoading = false; })

      .addCase(logout.fulfilled, (state) => { state.user = null; state.isAuthenticated = false; state.error = null; state.isLoading = false; })

      .addCase(verifyEmail.fulfilled, (state, action) => { state.user = action.payload.user; state.isAuthenticated = true; state.isLoading = false; })
      .addCase(verifyEmail.rejected, (state, action) => { state.error = action.payload.message; state.isLoading = false; })

      .addCase(checkAuth.pending, (state) => { state.isCheckingAuth = true; state.error = null; })
      .addCase(checkAuth.fulfilled, (state, action) => { state.user = action.payload.user; state.isAuthenticated = true; state.isCheckingAuth = false; })
      .addCase(checkAuth.rejected, (state) => { state.isAuthenticated = false; state.isCheckingAuth = false; })

      .addCase(forgotPassword.fulfilled, (state, action) => { state.message = action.payload.message; state.isLoading = false; })
      .addCase(forgotPassword.rejected, (state, action) => { state.error = action.payload.message; state.isLoading = false; })

      .addCase(resetPassword.fulfilled, (state, action) => { state.message = action.payload.message; state.isLoading = false; })
      .addCase(resetPassword.rejected, (state, action) => { state.error = action.payload.message; state.isLoading = false; });
  },
});

export const selectAuth = (state) => state.auth;

const authStore = configureStore({ reducer: { auth: authSlice.reducer } });
export default authStore;
