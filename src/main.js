import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {render} from 'react-dom';

import {CommonContextProvider} from './AppTemplate/CommonContext';

import AsyncRoute from './common/AsyncRoute';
import AppTemplate from './AppTemplate';

const Home = () => import(/* webpackChunkName: "Home" */ './Home');
const Avatar = () => import(/* webpackChunkName: "Avatar" */ './Avatar');

render(
    <Router>
      <CommonContextProvider>
        <AppTemplate>
          <AsyncRoute exact path='/' moduleProvider={Home} />
          <AsyncRoute exact path='/avatar' moduleProvider={Avatar} />
        </AppTemplate>
      </CommonContextProvider>
    </Router>,
    document.getElementById('app')
);
