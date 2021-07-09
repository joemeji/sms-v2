import React from 'react'
import { connect } from 'react-redux'
import * as h from 'styled/header'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

export const Header = (props) => {
  return (
    <h.Header>
      <h.Nav className="container">
        <h.Logo>ECOM Academy</h.Logo>
        <div className="links">
          <NavLink to="/student">Student</NavLink>
          <NavLink to="/plan">All Payment Dues</NavLink>
          <NavLink to="/plan">Plans</NavLink>
          <NavLink to="/plan">Sales Rep</NavLink>
          <NavLink to="/plan">Pipeline</NavLink>
          <NavLink to="/plan">Funnel</NavLink>
        </div>
        <Button primary="true">Logout</Button>
      </h.Nav>
    </h.Header>
  )
}

const mapStateToProps = (state) => ({ })
export default connect(mapStateToProps)(Header)



