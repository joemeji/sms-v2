import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Create from './Create'
import List from './List'
import View from './View'

export const Index = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route path={`${match.url}/create/:stepId`} component={Create} />
        <Route path={`${match.url}/:studentId`} component={View} />
        <Route path={`${match.url}/`} component={List} />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Index)
