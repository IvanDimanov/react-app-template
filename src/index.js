import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'

import AsyncComponent from './utils/AsyncComponent'
import AppTemplate from './AppTemplate'

const Home = () => import(/* webpackChunkName: "Home" */ './Home')
const Avatar = () => import(/* webpackChunkName: "Avatar" */ './Avatar')

const AsyncPropsRoute = (props) => (
  <Route
    {...props}
    render={() => <AsyncComponent moduleProvider={props.moduleProvider} moduleProps={props.moduleProps} />}
  />
)

render(
  <Router>
    <AppTemplate>
      <AsyncPropsRoute exact path='/' moduleProvider={Home} />
      <AsyncPropsRoute exact path='/avatar' moduleProvider={Avatar} />
    </AppTemplate>
  </Router>,
  document.getElementById('app')
)
