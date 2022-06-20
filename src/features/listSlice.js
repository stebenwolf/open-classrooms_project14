// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
  name: 'currentEmployees',
  initialState: {
    list: []
  },
  reducers: {
    addNewEmployee: (state, action) => {
        state.list.push(action.payload);
    },
  }
});

export const { addNewEmployee } = listSlice.actions;

export default listSlice.reducer;