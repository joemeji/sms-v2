import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 3px;
`;

export const Input = React.forwardRef((props, ref) => (
  <>
    <Label htmlFor={props.id}>{props.label}</Label>
    <input type={props.type} className={`form-control ${props.className || ''}`} {...props} ref={ref} />
  </>
))

export const Select = React.forwardRef((props, ref) => (
  <>
    <Label htmlFor={props.id}>{props.label}</Label>
    <select {...props} className={`form-control ${props.className || ''}`} ref={ref}>
      {props.options && props.options.map((item, key) => (
        <option value={item.value} key={key}>{item.text || item.value}</option>
      ))}
    </select>
  </>
));