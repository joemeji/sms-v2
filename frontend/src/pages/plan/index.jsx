import React from 'react';
import { connect } from 'react-redux';
import Create from './Create';

export const Index = (props) => {
  return (
    <>
      <h3 className="text-center">Plans</h3>
      <div className="row">
        <div className="col-md-4">
          <Create />
        </div>

        <div className="col-md-8">
          <div className="plan-lists">
            
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
