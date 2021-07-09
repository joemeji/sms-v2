import React, { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import * as Forms from 'components/Forms'
import * as P from './planStyle'
import { recurrence as dReccurence, currencies } from 'helpers/dropdown'
import axios from 'axios'
import { addDocs } from 'store/reducer/planReducer'

export const Create = (props) => {
  const [amount, setAmount] = React.useState('')
  const [currency, setCurrency] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [recurrence, setRecurrence] = React.useState('')
  const [resultName, setResultName] = React.useState('')
  const [disabledBtn, setDisabledBtn] = React.useState(false)
  const dispatch = useDispatch()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setDisabledBtn(true)
    const payload = { 
      amount: Number(amount), 
      quantity: Number(quantity), 
      currency, 
      recurrence, 
      resultName, 
    }
    const res = await axios.post('/api/plan', payload);
    if (res.data) {
      dispatch( addDocs(res.data) )
      setDisabledBtn(false)
      setAmount('')
      setCurrency('')
      setRecurrence('')
      setQuantity('')
      setResultName('')
    }
  }, [amount, currency, quantity, recurrence, resultName, dispatch])

  React.useEffect(() => {
    if (amount && currency && recurrence && quantity) {
      setResultName(`${amount} ${currency} × ${quantity} ${recurrence}`)
    }
  }, [amount, currency, quantity, recurrence])

  return (
    <P.FormWrapper className="rounded" onSubmit={handleSubmit}>
      <h5 className="mb-4">Create Plan</h5>
      <FormGroup>
        <div className="row">
          <div className="col-md-6">
            <Forms.Input 
              type="number"
              label="Amount" 
              id="Amount"
              placeholder="Enter Amount..."
              required
              onChange={e => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <div className="col-md-6">
            <Forms.Select 
              label="Currency" 
              id="Currency"
              placeholder="Enter Currency..."
              required
              options={['', ...currencies].map(text => ({text}))}
              onChange={e => setCurrency(e.target.value)}
              value={currency}
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
          required
          onChange={e => setQuantity(e.target.value)}
          value={quantity}
        />
      </FormGroup>
      <FormGroup>
        <Forms.Select 
          label="Recurrence" 
          id="Recurrence"
          placeholder="Enter Recurrence..."
          required
          options={['', ...dReccurence].map(value => ({ value }))}
          onChange={e => setRecurrence(e.target.value)}
          value={recurrence}
        />
      </FormGroup>
      <FormGroup>
        <Forms.Input 
          label="Name" 
          id="Name"
          placeholder="Enter Name..."
          required
          onChange={e => setResultName(e.target.value)}
          value={resultName}
        />
      </FormGroup>
      <div className="text-right">
        <Button 
          disabled={disabledBtn} 
          type="submit">Submit</Button>
      </div>
    </P.FormWrapper>
  )
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(Create)

function FormGroup(props) {
  return (
    <div className="form-group" {...props}>
      {props.children}
    </div>
  )
}
