import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Create from './Create';
import Edit from './Edit';
import * as P from './planStyle';
import axios from 'axios'
import { fetch, isFetching, setEdit } from 'store/reducer/planReducer'
import Pagination from 'components/Pagination'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'hooks'
import { PaginationWrapper } from 'styled'
import Box from 'components/Box';

export const Index = (props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const query = useQuery()
  const queries = query.toString()

  React.useEffect(() => {
    (async () => {
      dispatch(isFetching(true))
      const res = await axios.get(`/api/plan${queries ? `?${queries}` : ''}`)
      dispatch(fetch(res.data))
      dispatch(isFetching(false))
    })()
  }, [dispatch, queries])

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          {props.isEdit ? <Edit/> : <Create/>}
        </div>

        <div className="col-md-8">
          <Box hasBackBtn={false} title="Plans">
            <P.Table className="table mb-3 mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Currency</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.plan && props.plan.docs && props.plan.docs.map((item, key) => (
                  <tr key={key}>
                    <td>{item.resultName}</td>
                    <td>{item.currency}</td>
                    <td>
                      <button 
                        onClick={() => dispatch( setEdit({ isEdit: true, _id: item._id }) )} 
                        className="btn btn-sm text-primary">Edit</button>
                      <button className="btn btn-sm text-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </P.Table>
            {props.plan && props.plan.totalDocs > props.plan.limit && (
              <PaginationWrapper className="mb-3">
                <Pagination 
                  prevPage={props.plan.prevPage}
                  nextPage={props.plan.nextPage}
                  path={`${location.pathname}?page`}
                  current={props.plan.page} 
                  totalPages={props.plan.totalPages} />
              </PaginationWrapper>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  plan: state.plan.planDocs,
  isFetching: state.plan.isFetching,
  error: state.plan.error,
  isEdit: state.plan.isEdit,
});

export default connect(mapStateToProps)(Index);
