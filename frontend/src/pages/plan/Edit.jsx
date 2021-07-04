import React, { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import * as Forms from 'components/Forms'
import * as P from './planStyle'
import { useFormInput } from 'hooks'
import { recurrence as dReccurence, currencies } from 'helpers/dropdown'
import axios from 'axios'
import { setEdit } from 'store/reducer/planReducer'

export const Edit = (props) => {
  const amount = useFormInput('')
  const currency = useFormInput('')
  const quantity = useFormInput('')
  const recurrence = useFormInput('')
  const [resultName, setResultName] = React.useState('')
  const [disabledBtn, setDisabledBtn] = React.useState(false)
  const dispatch = useDispatch()

  const doc = props.plan && props.plan.docs && props.plan.docs.find(item => item._id === props.editId)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setDisabledBtn(true)
    const payload = { 
      amount: Number(amount.value), 
      currency: currency.value, 
      quantity: Number(quantity.value), 
      recurrence: recurrence.value, 
      resultName: resultName.value, 
    }
    const res = await axios.post(`/api/plan/${props.editId}`, payload);
    console.log(res.data);
    setDisabledBtn(false)
  }, [amount, currency, quantity, recurrence, resultName, props.editId])

  React.useEffect(() => {
    if (doc) {
      setResultName(doc.resultName || '')
    }
  }, [doc])

  if (props.isEdit) {
    if (doc) {
      amount.value = doc.amount
      currency.value = doc.currency
      recurrence.value = doc.recurrence
      quantity.value = doc.quantity
    }
  }

  React.useEffect(() => {
    if (amount.value && currency.value && recurrence.value && quantity.value) {
      setResultName(`${amount.value} ${currency.value} × ${quantity.value} ${recurrence.value}`)
    }
  }, [amount, currency, quantity, recurrence])

  return (
    <P.FormWrapper className="rounded" onSubmit={handleSubmit}>
      <h5 className="mb-4">Edit Plan</h5>
      <FormGroup>
        <div className="row">
          <div className="col-md-6">
            <Forms.Input 
              type="number"
              label="Amount" 
              id="Amount"
              placeholder="Enter Amount..."
              {...amount}
              required
            />
          </div>
          <div className="col-md-6">
            <Forms.Select 
              label="Currency" 
              id="Currency"
              placeholder="Enter Currency..."
              {...currency}
              required
              options={['', ...currencies].map(text => ({text}))}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Forms.Input 
          type="number"
          label="Quantity" 
          id="Quantity"
          placeholder="Enter Quantity..."
          {...quantity}
          required
        />
      </FormGroup>
      <FormGroup>
        <Forms.Select 
          label="Recurrence" 
          id="Recurrence"
          placeholder="Enter Recurrence..."
          options={['', ...dReccurence].map(value => ({ value }))}
          {...recurrence}
          required
        />
      </FormGroup>
      <FormGroup>
        <Forms.Input 
          label="Name" 
          id="Name"
          placeholder="Enter Name..."
          onChange={e => setResultName(e.target.value)}
          value={resultName}
          required
        />
      </FormGroup>
      <div className="text-right">
        <Button 
          disabled={disabledBtn}
          variant="light" 
          className="mr-2"
          onClick={() => dispatch(setEdit({ isEdit: false, _id: null }))}
          type="button">Cancel</Button>
        <Button 
          disabled={disabledBtn} 
          type="submit">Update</Button>
      </div>
    </P.FormWrapper>
  )
}

const mapStateToProps = (state) => ({
  isEdit: state.plan.isEdit,
  editId: state.plan.editId,
  plan: state.plan.planDocs
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)

function FormGroup(props) {
  return (
    <div className="form-group" {...props}>
      {props.children}
    </div>
  )
}
