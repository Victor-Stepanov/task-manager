import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { config } from '../../utils/const';
import { setCookie } from '../../utils/utils';

export const sendUserData = createAsyncThunk(
  'user/sendUserData',
  async function (form, { rejectWithValue }) {
    console.log(form);
    try {
      const responce = await fetch(
        `${config.baseUrl}/accounts/authentication/reg/`,
        {
          method: 'POST',
          headers: config.headers,
          body: JSON.stringify(form),
        }
      );

      if (!responce.ok) {
        throw new Error('An error occurred during user registration');
      }

      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendLoginData = createAsyncThunk(
  'user/sendLoginData',
  async function (form, { rejectWithValue }) {
    try {
      const responce = await fetch(
        `${config.baseUrl}/accounts/authentication/auth/`,
        {
          method: 'POST',
          headers: config.headers,
          body: JSON.stringify(form),
        }
      );
      if (!responce.ok) {
        throw new Error('An error occurred during authorization');
      }
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  registerRequest: false,
  registerSuccess: false,
  registerFailed: true,
  detail: '',

  user: [],
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: undefined,
  extraReducers: builder => {
    builder.addCase(sendUserData.pending, state => {
      state.registerRequest = true;
    });
    builder.addCase(sendUserData.fulfilled, (state, action) => {
      state.registerRequest = false;
      state.registerSuccess = true;
      state.detail = action.payload;
    });
    builder.addCase(sendUserData.rejected, state => {
      state.registerFailed = false;
    });
    builder.addCase(sendLoginData.pending, state => {
      state.loginRequest = true;
    });
    builder.addCase(sendLoginData.fulfilled, (state, action) => {
      const { token, user } = action.payload;
      const authToken = token;
      setCookie('token', authToken);
      state.loginRequest = false;
      state.loginSuccess = true;
      state.user = user;
    });
    builder.addCase(sendLoginData.rejected, state => {
      state.loginFailed = true;
    })
  },
});

export default userSlice.reducer;
