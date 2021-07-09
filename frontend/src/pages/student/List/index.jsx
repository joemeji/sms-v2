import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const Index = ({ match }) => {
  return (
    <>
      <h3 className="text-center mb-4 font-weight-bold">Student</h3>
      <Link to={`${match.url}/create/1`}>Create</Link>
      {match.url}
    </>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
