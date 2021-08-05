import styled from 'styled-components'

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  background: #fff;
  padding: 10px 30px 30px;
  width: 100%;
  max-width: 600px;
  border-radius: 4px;
`;

export const BackButton = styled.button`
  border-radius: 50%;
  font-size: 1.2em;
  font-weight: 600;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  &:hover {
    background: #f5f5f5;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-left: -10px;
`;

export const TableWrapper = styled.div`
  background: #ffff;
  box-shadow: 0 3px 30px #00000005;
  border-radius: 3px;
  overflow: hidden;
  thead tr th {
    border-top: none !important;
  }
`;