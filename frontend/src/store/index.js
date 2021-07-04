import { configureStore } from '@reduxjs/toolkit'
import planReducer from './reducer/planReducer'


export default configureStore({
  reducer: {
    plan: planReducer
  }
});