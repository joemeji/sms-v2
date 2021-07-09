import React from 'react'
import { connect } from 'react-redux'
import { Form, BackButton, FormHeader } from '../studentStyle'
import { Input } from 'components/Forms'
import Button from 'react-bootstrap/Button'
import { MdKeyboardBackspace } from "react-icons/md";

export const PaymentInfo = (props) => {
  return (
    <Form>
      <FormHeader>
        <BackButton type="button" className="btn">
          <MdKeyboardBackspace />
        </BackButton>
        <h5 className="mb-0 ml-3">Payment Info</h5>
      </FormHeader>
      <FormGroup>
        <Input label="First Name" />
      </FormGroup>
      <FormGroup>
        <Input label="Last Name" />
      </FormGroup>
      <FormGroup>
        <Input label="Email" />
      </FormGroup>
      <FormGroup>
        <Input label="Phone" />
      </FormGroup>
      <FormGroup>
        <Input label="Country" />
      </FormGroup>
      <FormGroup>
        <Input label="Pipeline" />
      </FormGroup>
      <FormGroup>
        <Input label="Funnel" />
      </FormGroup>
      <div className="text-right">
        <Button type="button" variant="default" className="mr-2">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save & Proceed
        </Button>
      </div>
    </Form>
  )
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PaymentInfo)

function FormGroup({ children }) {
  return (
    <div className="form-group">
      {children}
    </div>
  )
}