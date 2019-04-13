import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import AsyncComponent from './AsyncComponent';

const AsyncRoute = (props) => (
  <Route
    {...props}
    render={() => <AsyncComponent moduleProvider={props.moduleProvider} moduleProps={props.moduleProps} />}
  />
);

AsyncRoute.propTypes = {
  moduleProvider: PropTypes.func.isRequired,
  moduleProps: PropTypes.object,
};

export default AsyncRoute;
