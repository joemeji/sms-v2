import styled from 'styled-components';

export const FormWrapper = styled.form`
  background: #fff;
  padding: 30px;
`;

export const PlanList = styled.div`
  background: #fff;
  padding: 5px 0px;
`;

export const Table = styled.table`
  thead {
    tr {
      &:first-child {
        th {
          border-top: none;
        }
      }
    }
  }
  tbody {
    tr {
      &:nth-child(odd) td {
        background: #f9f9f9;
      }
      td {
        color: #6c757d;
        font-size: 0.9em;
        font-weight: 500;
      }
    }
  }
`;