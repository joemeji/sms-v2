import React from 'react'
import { connect } from 'react-redux'
import { FormWrapper } from '../studentStyle'
import StudentInfo from './StudentInfo'
import PaymentInfo from './PaymentInfo'
import { useParams } from 'react-router-dom'

export const Index = (props) => {
  const { stepId } = useParams()

  return (
    <FormWrapper>
      {stepId == 1 && <StudentInfo />}
      {stepId == 2 && <PaymentInfo />}
    </FormWrapper>
  )
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(Index)
