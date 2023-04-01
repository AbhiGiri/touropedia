import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../app/api";


export const login = createAsyncThunk("auth/login", async({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.login(formValue);
    toast.success("Login Successfully");
    navigate("/");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const register = createAsyncThunk("auth/register", 
  async({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.register(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async({ result, navigate, toast }, { rejectWithValue }) => {
  console.log(result);
  try {
    const response = await api.googleSignIn(result);
    toast.success("Google SignIn Successfully");
    navigate("/");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({name: 'auth', initialState: {
    user: null,
    isError: '',
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      localStorage.clear();
      state.user = []
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.isError = action.payload
    },
    [register.pending]: (state) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.isError = action.payload
    },
    [googleSignIn.pending]: (state) => {
      state.loading = true
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false
      state.isError = action.payload
    },
  }
});

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer;