import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

/**
 * createSlice(): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
 *
 * createAsyncThunk: accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise
 *
 * createAsyncThunk accepts three parameters: a string action type value, a payloadCreator callback, and an options object.
 */

/**
 * Login thunk
 * type: 'auth/login'
 */
export const login = createAsyncThunk(
  'auth/login',
  async ({ formValues, navigate, toast }, { rejectWithValue }) => {
    // rejectWithValue: captures any error message that comes from the backend
    try {
      console.log(formValues);
      const response = await api.login(formValues);
      console.log(response);

      toast.success('Login Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ formValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signup(formValues);
      console.log(response);

      toast.success('Register Successfully');
      navigate('/');

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        'SmartElectionsProfile',
        JSON.stringify({ ...action.payload })
      );
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        'SmartElectionsProfile',
        JSON.stringify({ ...action.payload })
      );
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
