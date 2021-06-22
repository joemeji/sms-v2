import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import * as Forms from 'components/Forms';
import * as P from 'styled/plan';
import { useFormInput } from 'hooks';

export const Create = (props) => {
  const amount = useFormInput(0);
  const currency = useFormInput('USD');
  const quantity = useFormInput(0);
  const recurrence = useFormInput('Monthly');
  const resultName = useFormInput('');

  return (
    <P.FormWrapper className="rounded">
      <h5 className="mb-4">Create Plan</h5>
      <FormGroup>
        <div className="row">
          <div className="col-md-6">
            <Forms.Input 
              type="number"
              label="Amount" 
              id="Amount"
              placeholder="Enter Amount..."
              {...amount}
            />
          </div>
          <div className="col-md-6">
            <Forms.Input 
              label="Currency" 
              id="Currency"
              placeholder="Enter Currency..."
              {...currency}
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
        />
      </FormGroup>
      <FormGroup>
        <Forms.Input 
          label="Recurrence" 
          id="Recurrence"
          placeholder="Enter Recurrence..."
          {...recurrence}
        />
      </FormGroup>
      <FormGroup>
        <Forms.Input 
          label="Name" 
          id="Name"
          placeholder="Enter Name..."
          {...resultName}
        />
      </FormGroup>
      <Button>Save</Button>
    </P.FormWrapper>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Create);

function FormGroup(props) {
  return (
    <div className="form-group" {...props}>
      {props.children}
    </div>
  )
}
