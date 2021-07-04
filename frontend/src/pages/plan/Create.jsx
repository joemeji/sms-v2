import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import * as Forms from 'components/Forms'
import * as P from './planStyle'
import { useFormInput } from 'hooks'
import { recurrence as dReccurence, currencies } from 'helpers/dropdown'
import axios from 'axios'

export const Create = (props) => {
  const amount = useFormInput('')
  const currency = useFormInput('')
  const quantity = useFormInput('')
  const recurrence = useFormInput('')
  const [resultName, setResultName] = React.useState('');
  const [disabledBtn, setDisabledBtn] = React.useState(false);

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
    const res = await axios.post('/api/plan', payload);
    console.log(res.data);
    setDisabledBtn(false)
  }, [amount, currency, quantity, recurrence, resultName])

  React.useEffect(() => {
    if (amount.value && currency.value && recurrence.value && quantity.value) {
      setResultName(`${amount.value} ${currency.value} × ${quantity.value} ${recurrence.value}`)
    }
  }, [amount, currency, quantity, recurrence])

  return (
    <P.FormWrapper className="rounded" onSubmit={handleSubmit}>
      <h5 className="mb-4">{props.isEdit ? 'Edit' : 'Create'} Plan</h5>
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
          type="submit">{props.isEdit ? 'Update' : 'Submit'}</Button>
      </div>
    </P.FormWrapper>
  )
}

const mapStateToProps = (state) => ({
  isEdit: state.plan.isEdit,
  editId: state.plan.editId
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Create)

function FormGroup(props) {
  return (
    <div className="form-group" {...props}>
      {props.children}
    </div>
  )
}
