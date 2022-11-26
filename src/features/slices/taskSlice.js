import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { config } from '../../utils/const';
import { getCookie } from '../../utils/utils';

export const sendTaskData = createAsyncThunk(
  'tasks/sendTaskData',
  async function (form, { rejectWithValue }) {
    try {
      const responce = await fetch(`${config.baseUrl}/todo/tasks/`, {
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

export const fetchTaskData = createAsyncThunk(
  'tasks/fetchTaskData',
  async function (id, { rejectWithValue }) {
    try {
      const responce = await fetch(
        `${config.baseUrl}/todo/tasks/?todo_list=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
          },
        }
      );

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

export const deleteTaskData = createAsyncThunk(
  'tasks/deleteTaskData',
  async function (id, { rejectWithValue }) {
    console.log(id);
    try {
      const responce = await fetch(`${config.baseUrl}/todo/tasks/${id}/`, {
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

export const completeTaskData = createAsyncThunk(
  'tasks/completeTaskData',
  async function (id, { rejectWithValue }) {
    try {
      const responce = await fetch(
        `${config.baseUrl}/todo/tasks/complete/${id}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
          },
          body: JSON.stringify(id),
        }
      );

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

export const updateTaskData = createAsyncThunk(
  'tasks/updateTaskData',
  async function (form, { rejectWithValue }) {
    try {
      const responce = await fetch(`${config.baseUrl}/todo/tasks/${form.id}/`, {
        method: 'PUT',
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
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],

  createRequest: false,
  createSuccess: false,
  createFailed: false,

  fetchRequest: false,
  fetchSuccess: false,
  fetchFailed: false,

  detail: '',
  deleteRequest: false,
  deleteSuccess: false,
  deleteFailed: false,

  completeRequest: false,
  completeSuccess: false,
  completeFailed: false,

  updateRequest: false,
  updateSuccess: false,
  updateFailed: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: undefined,
  extraReducers: builder => {
    builder.addCase(sendTaskData.pending, state => {
      state.createRequest = true;
    });
    builder.addCase(sendTaskData.fulfilled, (state, action) => {
      state.createRequest = false;
      state.createSuccess = true;
      state.tasks.push(action.payload);
    });
    builder.addCase(sendTaskData.rejected, state => {
      state.createFailed = true;
      state.createRequest = false;
      state.createSuccess = false;
    });
    builder.addCase(fetchTaskData.pending, state => {
      state.fetchRequest = true;
      state.fetchSuccess = false;
      state.fetchFailed = false;
    });
    builder.addCase(fetchTaskData.fulfilled, (state, action) => {
      state.fetchRequest = false;
      state.fetchSuccess = true;
      state.fetchFailed = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTaskData.rejected, state => {
      state.fetchFailed = true;
      state.fetchRequest = false;
      state.fetchSuccess = false;
    });
    builder.addCase(deleteTaskData.pending, state => {
      state.deleteRequest = true;
      state.deleteFailed = false;
      state.deleteSuccess = false;
    });
    builder.addCase(deleteTaskData.fulfilled, (state, action) => {
      state.deleteRequest = false;
      state.deleteSuccess = true;
      state.deleteFailed = false;
      state.tasks = state.tasks.filter(item => item.id !== action.payload.id);
    });
    builder.addCase(deleteTaskData.rejected, state => {
      state.deleteFailed = true;
      state.deleteRequest = false;
      state.deleteSuccess = false;
    });
    builder.addCase(completeTaskData.pending, state => {
      state.completeRequest = true;
      state.completeSuccess = false;
      state.completeFailed = false;
    });
    builder.addCase(completeTaskData.fulfilled, (state, action) => {
      state.completeRequest = false;
      state.completeSuccess = true;
      state.completeFailed = false;
      state.detail = action.payload;
    });
    builder.addCase(completeTaskData.rejected, state => {
      state.completeRequest = false;
      state.completeSuccess = false;
      state.completeFailed = true;
    });
    builder.addCase(updateTaskData.pending, state => {
      state.updateRequest = true;
      state.updateSuccess = false;
      state.updateFailed = false;
    });
    builder.addCase(updateTaskData.fulfilled, (state, action) => {
      state.updateRequest = false;
      state.updateSuccess = true;
      state.updateFailed = false;
    });
    builder.addCase(updateTaskData.rejected, state => {
      state.updateRequest = false;
      state.updateSuccess = false;
      state.updateFailed = true;
    });
  },
});

export default taskSlice.reducer;
