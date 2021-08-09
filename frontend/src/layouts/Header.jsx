import React from 'react'
import { connect } from 'react-redux'
import * as h from 'styled/header'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export const Header = (props) => {
  const handleLogout = async () => {
    try {
      const {data} = await axios.post('/api/user/logout')
      if (data.success === true) {
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
    }
    catch(err) {
      console.log(err)
    }
  }


  return (
    <h.Header>
      <h.Nav className="container">
        <h.Logo>ECOM Academy</h.Logo>
        <div className="links">
          <NavLink to="/student">Student</NavLink>
          <NavLink to="/all-payment-dues">All Payment Dues</NavLink>
          <NavLink to="/plan">Plans</NavLink>
        </div>
        <Button primary="true"onClick={handleLogout}>Logout</Button>
      </h.Nav>
    </h.Header>
  )
}

const mapStateToProps = (state) => ({ })
export default connect(mapStateToProps)(Header)



