import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Index = (props) => {
  const { studentId } = useParams()

  console.log(studentId)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          sds
        </div>
        <div className="col-md-9">
          sdsd
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
