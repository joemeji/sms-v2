import { configureStore } from '@reduxjs/toolkit'
import plan from './reducer/planReducer'


export default configureStore({
  reducer: {
    plan,
  }
});