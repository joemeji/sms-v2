import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 3px;
`;

export function Input(props) {
  return (
    <>
      <Label htmlFor={props.id}>{props.label}</Label>
      <input type={props.type} className={`form-control ${props.className || ''}`} {...props} />
    </>
  );
}

export function Select(props) {
  return (
    <>
      <Label htmlFor={props.id}>{props.label}</Label>
      <select {...props} className={`form-control ${props.className || ''}`}>
        {props.options && props.options.map((item, key) => (
          <option value={item.value} key={key}>{item.text || item.value}</option>
        ))}
      </select>
    </>
  );
}