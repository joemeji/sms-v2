import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { Form, BackButton, FormHeader } from '../studentStyle'
import { Input, Select } from 'components/Forms'
import Button from 'react-bootstrap/Button'
import { MdKeyboardBackspace } from "react-icons/md"
import { useForm } from "react-hook-form"
import { funnels, pipelines } from 'helpers/dropdown'

export const Create = (props) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = useCallback((data) => {
    console.log(data)
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <BackButton type="button" className="btn">
          <MdKeyboardBackspace />
        </BackButton>
        <h5 className="mb-0 ml-3">Student Info</h5>
      </FormHeader>
      <FormGroup>
        <Input label="First Name" placeholder="First Name"
          {...register('firstName', { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Input label="Last Name" placeholder="Last Name"
          {...register('lastName', { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Input label="Email" placeholder="Email" 
          {...register('email', { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Input label="Phone" placeholder="Phone" 
          {...register('phone', { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Input label="Country" placeholder="Country" 
          {...register('country', { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Select label="Pipeline" 
          {...register('pipeline', { required: true })}
          options={['', ...pipelines].map(value => ({ value }))}
        />
      </FormGroup>
      <FormGroup>
        <Select label="Funnel" 
          {...register('funnel', { required: true })}
          options={['', ...funnels].map(value => ({ value }))}
        />
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
export default connect(mapStateToProps)(Create)

function FormGroup({ children }) {
  return (
    <div className="form-group">
      {children}
    </div>
  )
}