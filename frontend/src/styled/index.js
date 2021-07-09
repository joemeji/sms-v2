import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  background: #fff;
  padding: 10px;
  margin-top: 9px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  .pagination {
    margin-bottom: 0;
    .page-link {
      font-weight: 500;
      color: #000;
      border: 1px solid white;
      border-radius: 7px;
      margin: 0 1px;
      &.active {
        background: #dbe2e8;
      }
    }
  }
`;