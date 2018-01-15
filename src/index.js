import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'

import AsyncComponent from './utils/AsyncComponent'
import AppTemplate from './AppTemplate'

const Home = () => import(/* webpackChunkName: "Home" */ './Home')
const Contacts = () => import(/* webpackChunkName: "Contacts" */ './Contacts')
const Projects = () => import(/* webpackChunkName: "Projects" */ './Projects')

render(
  <Router>
    <AppTemplate>
      <Route exact path='/' component={() => <AsyncComponent moduleProvider={Home} />} />
      <Route exact path='/contacts' component={() => <AsyncComponent moduleProvider={Contacts} />} />
      <Route exact path='/projects' component={() => <AsyncComponent moduleProvider={Projects} />} />
    </AppTemplate>
  </Router>,
  document.getElementById('app')
)
