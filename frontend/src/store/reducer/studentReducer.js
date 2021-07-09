import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
  name: 'slice',
  initialState: {
    studentDocs: {},
    isFetching: false,
    error: null,
  },
  reducers: {

  }
})

export const {  } = studentSlice.actions

export default studentSlice.reducer