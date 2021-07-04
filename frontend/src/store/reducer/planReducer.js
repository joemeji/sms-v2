import { createSlice } from '@reduxjs/toolkit'

export const planSlice = createSlice({
  name: 'plan',
  initialState: {
    planDocs: {},
    isFetching: false,
    error: null,
    isEdit: false,
    editId: null,
  },
  reducers: {
    fetch: (state, action) => {
      state.planDocs = action.payload
    },
    isFetching: (state, action) => {
      state.isFetching = action.payload
    },
    setEdit(state, action) {
      state.isEdit = action.payload.isEdit
      state.editId = action.payload._id
    }
  }
})  

export const { fetch, isFetching, setEdit } = planSlice.actions

export default planSlice.reducer