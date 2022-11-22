import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';
import { config } from '../../utils/const';
import { getCookie } from '../../utils/utils';

export const sendListData = createAsyncThunk(
  'list/sendListData',
  async function (form, { rejectWithValue }) {
    try {
      const responce = await fetch(`${config.baseUrl}/todo/lists/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify(form),
      });

      if (!responce.ok) {
        throw new Error('An error occurred during list create');
      }

      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchListData = createAsyncThunk(
  'list/fetchListData',
  async function (_, { rejectWithValue }) {
    try {
      const responce = await fetch(`${config.baseUrl}/todo/lists/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
        },
      });

      if (!responce.ok) {
        throw new Error('An error occurred during list create');
      }

      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteListData = createAsyncThunk(
  'list/deleteListData',
  async function (id, { rejectWithValue }) {
    console.log(id);
    try {
      const responce = await fetch(`${config.baseUrl}/todo/lists/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify(id),
      });

      if (!responce.ok) {
        throw new Error('An error occurred during list create');
      }

      //const data = await responce.json();
      //console.log(data)
      //return data;
      return responce;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  listCreateRequest: false,
  listCreateSuccess: false,
  listCreateFailed: false,

  fetchRequest: false,
  fetchSuccess: false,
  fetchFailed: false,

  deleteRequest: false,
  deleteSuccess: false,
  deleteFailed: false,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: undefined,
  extraReducers: builder => {
    builder.addCase(sendListData.pending, state => {
      state.listCreateRequest = true;
    });
    builder.addCase(sendListData.fulfilled, (state, action) => {
      state.listCreateRequest = false;
      state.listCreateSuccess = true;
      state.list.push(action.payload);
    });
    builder.addCase(sendListData.rejected, state => {
      state.listCreateFailed = true;
    });
    builder.addCase(fetchListData.pending, state => {
      state.fetchRequest = true;
    });
    builder.addCase(fetchListData.fulfilled, (state, action) => {
      state.fetchRequest = false;
      state.fetchSuccess = true;
      state.fetchFailed = false;
      state.list = action.payload;
    });
    builder.addCase(fetchListData.rejected, state => {
      state.fetchFailed = true;
    });
    builder.addCase(deleteListData.pending, state => {
      state.deleteRequest = true;
    });
    builder.addCase(deleteListData.fulfilled, (state, action) => {
      state.deleteRequest = false;
      state.deleteSuccess = true;
      state.list = state.list.filter(item => item.id !== action.payload.id);
    });
    builder.addCase(deleteListData.rejected, state => {
      state.deleteFailed = true;
    });
  },
});

export default listSlice.reducer;
