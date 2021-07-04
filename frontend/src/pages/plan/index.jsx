import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Create from './Create';
import * as P from './planStyle';
import axios from 'axios'
import { fetch, isFetching, setEdit } from 'store/reducer/planReducer'

export const Index = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch(isFetching(true))
      const res = await axios.get('/api/plan')
      dispatch(fetch(res.data))
      dispatch(isFetching(false))
    })()
  }, [dispatch])

  return (
    <>
      <h3 className="text-center mb-4 font-weight-bold">Plans</h3>
      <div className="row">
        <div className="col-md-4">
          <Create />
        </div>

        <div className="col-md-8">
          <P.PlanList className="rounded">
            {props.isFetching ? 'Loading...' : (
              <P.Table className="table">
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
                          onClick={() => dispatch(setEdit({ isEdit: true, _id: item._id }))} 
                          className="btn btn-sm text-primary">Edit</button>
                        <button className="btn btn-sm text-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </P.Table>
            )}
          </P.PlanList>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  plan: state.plan.planDocs,
  isFetching: state.plan.isFetching,
  error: state.plan.error,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
