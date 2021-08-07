import { createSlice } from '@reduxjs/toolkit'

const paymentList = createSlice({
  name: 'payment_list',
  initialState: {
    payment: {},
    isFetching: false,
    error: null,
  },  
  reducers: {
    allPaymentList(state, action) {
      if (action.payload.isFetching) {
        state.payment = {}
        state.isFetching = true
      } else {
        state.payment = action.payload.payment
        state.isFetching = false
      }
    },
    updatePaymentList(state, action) {
      state.payment.docs[action.payload.index] = action.payload.paymentData
    },
    deletePaymentList(state, action) {
      state.payment.docs = state.payment.docs.filter((item, index) => index !== action.payload.index)
    },
  }
})

export const { allPaymentList, updatePaymentList, deletePaymentList } = paymentList.actions

export default paymentList.reducer