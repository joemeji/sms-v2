import React from 'react';
import styled from 'styled-components';
import { DatePicker as AntDatePicker } from "antd"

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 3px;
`;

const DatePickerWrapper = styled.div`
  .ant-picker.regular {
    height: calc(1.75em + .76rem + 2px) !important;
    border-radius: .25rem !important;
    border: 1px solid #ced4da !important;
    width: 100%;
  }
`;

export const Input = React.forwardRef((props, ref) => (
  <>
    <Label htmlFor={props.id}>{props.label}</Label>
    <input type={props.type} className={`form-control ${props.className || ''}`} {...props} ref={ref} />
  </>
))

export const DatePicker = React.forwardRef(({label,id, className, onChange, value, ...rest}, ref) => (
  <>
    <Label htmlFor={id}>{label}</Label>
    <DatePickerWrapper>
      <AntDatePicker 
        id={id} 
        className={className || ''} 
        ref={ref} 
        onChange={onChange}
        value={value}
        {...rest} 
      />
    </DatePickerWrapper>
    
  </>
))

export const Select = React.forwardRef(({ value, onChange, id, label, options, className, ...rest }, ref) => (
  <>
    <Label htmlFor={id}>{label}</Label>
    <select 
      value={value}
      onChange={onChange}
      className={`form-control ${className || ''}`} 
      ref={ref}
      {...rest}
    >
      {options && options.map((item, key) => (
        <option value={item.value} key={key}>{item.text || item.value}</option>
      ))}
    </select>
  </>
));