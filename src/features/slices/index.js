import { combineReducers } from '@reduxjs/toolkit';
import listSlice from './listSlice';
import taskSlice from './taskSlice';
import userSlice from './userSlice';


export const rootReducer = combineReducers({
    userData:userSlice,
    listData:listSlice,
    tasksData:taskSlice
})