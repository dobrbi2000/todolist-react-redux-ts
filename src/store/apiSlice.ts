import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../api/userApi';

export interface FormData {
  email?: string;
  password: string;
  first_name?: string;
  second_name?: string;
  login: string;
  phone?: string;
}

export interface ApiState {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ApiState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: undefined,
};

export const signUp = createAsyncThunk<string, FormData, { rejectValue: string }>(
  'api/signUp',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiRequest({ suffix: 'auth/signup', method: 'POST', data: formData });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const signIn = createAsyncThunk<string, FormData, { rejectValue: string }>(
  'api/signIn',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      console.log('SignIn', formData);
      const response = await apiRequest({ suffix: 'auth/signup', method: 'POST', data: formData });
      console.log('signIn', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const checkAuthStatus = createAsyncThunk<boolean, void, { rejectValue: string }>(
  'api/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest({ suffix: 'auth/user', method: 'GET' });
      console.log('response checkAuthStatus:', response);

      if (response && response.reason) {
        console.log('Error reason:', response.reason);
        return false;
      }
      if (response && response.id !== '') {
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error in checkAuthStatus:', error);
      return rejectWithValue(error.message as string);
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        console.log('Registration successful', action.payload);
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Registration failed', action.payload);
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
        }
        console.log('Login successful', action.payload);
      })
      .addCase(signIn.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Login failed', action.payload);
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
        state.isLoading = false;
        console.log('action.payload addCase', action.payload);
        console.log('checkAuthStatus addCase', state.isAuthenticated);
      })
      .addCase(checkAuthStatus.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default apiSlice.reducer;
