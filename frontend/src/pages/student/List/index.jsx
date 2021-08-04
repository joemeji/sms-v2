import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { allStudent } from 'store/reducer/studentReducer'
import moment from 'moment'

export const Index = ({ match, student }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    (async () => {
      allStudent({ isFetching: true })
      const res = await axios.get('/api/student')
      if (res.data) {
        dispatch( allStudent({ isFetching: false, studentData: res.data }) )
      }
    })()
  }, [dispatch])
  
  return (
    <>
      <h3 className="text-center mb-4 font-weight-bold">Student</h3>
      <Link to={`${match.url}/create/1`}>Create</Link>
      <div className="container">
        <div className="table-responsive">
          <table className="table">
            <TableHead/>
            <tbody>
              {student.studentData && student.studentData.docs && student.studentData.docs.map((doc, key) => (
                <Lists key={key} doc={doc} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  student: state.student
})
export default connect(mapStateToProps)(Index)

const TableHead = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Payment Plan</th>
      <th>Contract Signed</th>
      <th>Sales Rep</th>
      <th>Status</th>
      <th>Joined Date</th>
      <th>Action</th>
    </tr>
  </thead>
)

const Lists = ({ doc }) => (
  <tr>
    <td>{doc.first_name} {doc.last_name}</td>
    <td>{doc.plan.length && doc.plan[0].resultName}</td>
    <td>{doc.signed_contract}</td>
    <td>{doc.sales_rep}</td>
    <td>{doc.payment_status}</td>
    <td>{moment(doc.joined_date).format('MMM DD, YYYY')}</td>
    <td></td>
  </tr>
)
