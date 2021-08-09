import React, { useCallback, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Form, BackButton, FormHeader } from '../studentStyle'
import { Input, Select, DatePicker } from 'components/Forms'
import Button from 'react-bootstrap/Button'
import { MdKeyboardBackspace } from "react-icons/md";
import { currencies, paymentMethods, paymentStatus, salesRep } from 'helpers/dropdown'
import { useForm } from "react-hook-form"
import { Redirect, useHistory } from 'react-router-dom'
import { useHttp } from 'hooks'
import { updatePaymentDetailsForm, emptyDetails } from 'store/reducer/createStudentReducer'
import moment from 'moment'
import { BsArrowRight } from "react-icons/bs"

export const PaymentInfo = (props) => {
  const { register, handleSubmit, setValue } = useForm()
  const [plans, setPlans] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()
  const [depositDate, setDepositDate] = useState(null)
  const [payment_date_start, setPaymentDateStart] = useState(null)
  const [joined_date, setJoinedDate] = useState(null)
  const [disableSubmit, setDisableSubmit] = useState(false)
  const http = useHttp()

  const onSubmit = useCallback((data) => {
    const deposit = [{ amount: data.amount, currency: data.currency, date: depositDate }]
    const payload = { ...data, deposit, payment_date_start, joined_date }
    delete payload.amount
    delete payload.currency
    setDisableSubmit(true)
    setTimeout(() => {
      dispatch(updatePaymentDetailsForm(payload))
      setDisableSubmit(false)
      history.push('/student/create/3')
    }, 300)
  }, [depositDate, joined_date, payment_date_start, dispatch, history])

  const onDatePickerChange = useCallback((date, dateString, type) => {
    switch(type) {
      case 'depositDate':
        setDepositDate(dateString)
        return
      case 'paymentDateStart':
        setPaymentDateStart(dateString)
        return
      case 'joinedDate':
        setJoinedDate(dateString)
        return
      default:
        return
    }
  }, [])

  useEffect(() => {
    let unmount = true
    if (unmount) {
      (async () => {
        const _ = props.payment_details
        const res = await http.get('/api/plan/all');
        if (unmount) setPlans(res.data)
        setValue('payment_plan_id', _ && _.payment_plan_id)
      })()
    }
    return () => {
      unmount = false
    }
  }, [props.payment_details, setValue])

  useEffect(() => {
    if (props.payment_details) {
      const _ = props.payment_details
      for (const [key, value] of Object.entries(props.payment_details)) {
        setValue(key, value)
      }
      setValue('amount', _ && _.deposit.length && _.deposit[0].amount)
      setValue('currency', _ && _.deposit.length && _.deposit[0].currency)
      setDepositDate(_ && _.deposit.length && _.deposit[0].date)
      setPaymentDateStart(_ && _.joined_date)
      setJoinedDate(_ && _.payment_date_start)
    }
  }, [props.payment_details, setValue])

  if (props.student_details === null) {
    return <Redirect to="/student/create/1" />
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <BackButton type="button" className="btn" onClick={() => history.push('/student/create/1')}>
          <MdKeyboardBackspace />
        </BackButton>
        <h5 className="mb-0 ml-3">Payment Info</h5>
      </FormHeader>
      <div className="py-4">
        <FormGroup>
          <div className="row">
            <div className="col-md-4">
              <Input type="number" label="Deposit" placeholder="Amount" 
                {...register('amount', { required: true })}
              />
            </div>
            <div className="col-md-4">
              <Select label="Currency" 
                {...register('currency', { required: true })}
                options={['', ...currencies].map(value => ({ value }))}
              />
            </div>
            <div className="col-md-4">
              <DatePicker
                label="Date"
                className="regular"
                format="YYYY-MM-DD"
                value={moment(depositDate || new Date())}
                onChange={(date, dateString) => onDatePickerChange(date, dateString, 'depositDate')}
              />
            </div>
          </div>
        </FormGroup>
        <FormGroup>
        <div className="row">
          <div className="col-md-6">
            <Select
              label="Payment Plan"
              {...register('payment_plan_id', { required: true })}
              options={['', ...plans.map(_ => ({ text: _.resultName, value: _._id }))]}
            />
          </div>
          <div className="col-md-6">
              <DatePicker
                label="Payment Date Start"
                className="regular"
                format="YYYY-MM-DD"
                value={moment(payment_date_start || new Date())}
                onChange={(date, dateString) => onDatePickerChange(date, dateString, 'paymentDateStart')}
              />
          </div>
        </div>
        </FormGroup>
        <FormGroup>
          <Select label="Signed Contract" 
            {...register('signed_contract', { required: true })}
            options={[
              {value: ''},
              {value: 'Yes'},
              {value: 'No'}
            ]}
          />
        </FormGroup>
        <FormGroup>
          <Select label="Sales Rep" 
            {...register('sales_rep', { required: true })}
            options={['', ...salesRep].map(value => ({ value }))}
          />
        </FormGroup>
        <FormGroup>
          <Select label="Payment Methods" 
            {...register('payment_method', { required: true })}
            options={['', ...paymentMethods].map(value => ({ value }))}
          />
        </FormGroup>
        <FormGroup>
          <Select label="Payment Status" 
            {...register('payment_status', { required: true })}
            options={['', ...paymentStatus].map(value => ({ value }))}
          />
        </FormGroup>
        <FormGroup>
          <DatePicker
            label="Joined Date"
            className="regular"
            format="YYYY-MM-DD"
            value={moment(joined_date || new Date())}
            onChange={(date, dateString) => onDatePickerChange(date, dateString, 'joinedDate')}
          />
        </FormGroup>
        <div className="text-right">
          <Button type="button" variant="default" className="mr-2" 
            onClick={() => dispatch(emptyDetails())}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={disableSubmit}>
            Next <BsArrowRight />
          </Button>
        </div>
      </div>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  student_details: state.createStudent.student_details,
  payment_details: state.createStudent.payment_details,
})
export default connect(mapStateToProps)(PaymentInfo)

function FormGroup({ children }) {
  return (
    <div className="form-group">
      {children}
    </div>
  )
}