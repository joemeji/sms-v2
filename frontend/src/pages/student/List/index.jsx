import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { allStudent } from 'store/reducer/studentReducer'
import moment from 'moment'
import { TableWrapper } from '../studentStyle'

export const Index = ({ match, student }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    (async () => {
      dispatch( allStudent({ isFetching: true }) )
      const res = await axios.get('/api/student')
      if (res.data) {
        dispatch( allStudent({ isFetching: false, studentData: res.data }) )
      }
    })()
  }, [dispatch])
  
  return (
    <>
      <h3 className="text-center mb-4 font-weight-bold">Student</h3>
      <div className="container">
        <Link 
          className="btn btn-sm btn-primary mb-3" 
          to={`${match.url}/create/1`}
        >
          Create Student
        </Link>
          <ListWrapper>
            {student.studentData && student.studentData.docs && student.studentData.docs.map((doc, key) => (
              <Lists key={key} doc={doc} match={match} />
            ))}
          </ListWrapper>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  student: state.student
})
export default connect(mapStateToProps)(Index)

const ListWrapper = ({ children }) => (
  <TableWrapper className="table-responsive">
    <table className="table mb-0">
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
      <tbody>
        {children}
      </tbody>
    </table>
  </TableWrapper>
)

const Lists = ({ doc, match }) => (
  <tr>
    <td>{doc.first_name} {doc.last_name}</td>
    <td>{doc.plan.length && doc.plan[0].resultName}</td>
    <td>{doc.signed_contract}</td>
    <td>{doc.sales_rep}</td>
    <td>{doc.payment_status}</td>
    <td>{moment(doc.joined_date).format('MMM DD, YYYY')}</td>
    <td>
      <Link to={`${match.url}/${doc._id}`} className="btn btn-sm text-primary mr-2">View</Link>
      <Link to={`${match.url}/${doc._id}/edit`} className="btn btn-sm text-danger">Edit</Link>
    </td>
  </tr>
)
