import React from 'react';
import { connect } from 'react-redux';
import Create from './Create';
import * as P from 'styled/plan';

export const Index = (props) => {
  return (
    <>
      <h3 className="text-center mb-4 font-weight-bold">Plans</h3>
      <div className="row">
        <div className="col-md-4">
          <Create />
        </div>

        <div className="col-md-8">
          <P.PlanList className="rounded">
            <P.Table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Currency</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1097 USD × 2 Monthly</td>
                  <td>USD</td>
                  <td>
                    <button className="btn btn-sm text-primary">Edit</button>
                    <button className="btn btn-sm text-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </P.Table>
          </P.PlanList>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
