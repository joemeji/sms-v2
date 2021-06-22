import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as h from 'styled/header'
import Button from 'react-bootstrap/Button'

export const Header = (props) => {
  return (
    <h.Header>
      <h.Nav className="container">
        <h.Logo>ECOM Academy</h.Logo>
        <div className="links">
          <h.Link href="facebook.com">Student</h.Link>
          <h.Link href="facebook.com">All Payment Dues</h.Link>
          <h.Link href="facebook.com">Plans</h.Link>
          <h.Link href="facebook.com">Sales Rep</h.Link>
          <h.Link href="facebook.com">Pipeline</h.Link>
          <h.Link href="facebook.com">Funnel</h.Link>
        </div>
        <Button primary="true">Logout</Button>
      </h.Nav>
    </h.Header>
  )
}

Header.propTypes = {
  props: PropTypes.object
}

const mapStateToProps = (state) => ({ })

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(Header)



