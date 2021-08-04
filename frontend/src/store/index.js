import { configureStore } from '@reduxjs/toolkit'
import plan from './reducer/planReducer'
import createStudent from './reducer/createStudentReducer'
import student from './reducer/studentReducer'


export default configureStore({
  reducer: {
    plan,
    createStudent,
    student,
  }
});