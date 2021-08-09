import React from 'react'
import { connect } from 'react-redux'
import * as h from 'styled/header'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { BiSun, BiMoon } from 'react-icons/bi'
import styled from 'styled-components'

const [html] = document.getElementsByTagName('html')

export const Header = () => {
  const [isDark, setIsDark] = React.useState(false)

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

  React.useEffect(() => {
    if (isDark) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
  }, [isDark])

  return (
    <h.Header>
      <h.Nav className="container">
        <h.Logo>ECOM Academy</h.Logo>
        <div className="links">
          <NavLink to="/student">Student</NavLink>
          <NavLink to="/all-payment-dues">All Payment Dues</NavLink>
          <NavLink to="/plan">Plans</NavLink>
        </div>
        <div>

          <div className="d-flex align-items-center">
            <TogglerButton onClick={() => setIsDark(!isDark)} className="mr-2">
              {isDark ? <BiSun /> : <BiMoon />}
            </TogglerButton>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </h.Nav>
    </h.Header>
  )
}

const mapStateToProps = (state) => ({ })
export default connect(mapStateToProps)(Header)



const TogglerButton = styled.button`
  border: 0;
  background: transparent;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  font-size: 26px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
`

