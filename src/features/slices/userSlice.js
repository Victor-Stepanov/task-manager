import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { config } from '../../utils/const';
import { getCookie, setCookie } from '../../utils/utils';

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

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async function (_, { rejectWithValue }) {
    try {
      const responce = await fetch(
        `${config.baseUrl}/accounts/profile/my_profile/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
          },
        }
      );
      if (!responce.ok) {
        throw new Error('An error occurred while receiving user data');
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

  userRequest: false,
  userSuccess: false,
  userFailed: false,
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
      state.loginRequest = false;
      state.loginSuccess = false;
      state.loginFailed = true;
    });
    builder.addCase(getUserInfo.pending, state => {
      state.userRequest = true;
      state.userSuccess = false;
      state.userFailed = false;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userRequest = false;
      state.userSuccess = true;
      state.userFailed = false;
      state.user = action.payload;
    });
    builder.addCase(getUserInfo.rejected, state => {
      state.userRequest = false;
      state.userSuccess = false;
      state.userFailed = true;
    });
  },
});

export default userSlice.reducer;
