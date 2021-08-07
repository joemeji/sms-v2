import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import List from './List'


export const Index = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/add`} />
      <Route exact path={`${match.url}/custom`} />
      <Route exact path={match.url} component={List} />
    </Switch>
  )
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(Index)
