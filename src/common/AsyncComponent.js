import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import Timeout from './Timeout';

const RendingError = () => (
  <div>We are unable to load this content for you at the monet.</div>
);

class AsyncComponent extends PureComponent {
  state = {
    Component: null,
    rendingError: null,
  }

  componentDidMount() {
    if (!this.state.Component) {
      this.props.moduleProvider()
          .then(({default: Component}) => this.setState({Component}));
    }
  }

  componentDidCatch(rendingError) {
    this.setState({rendingError});
  }

  render() {
    const {moduleProps} = this.props;
    const {rendingError, Component} = this.state;

    if (rendingError) {
      return <RendingError />;
    }

    return Component
      ? <Component {...moduleProps} />
      : (/* Show the loading `CircularProgress` only if the component is not loaded in `1000`[milliseconds] */
        <Timeout ms={1000}>
          {(didTimeout) => didTimeout ? <CircularProgress /> : null}
        </Timeout>
      );
  }
}

AsyncComponent.propTypes = {
  moduleProvider: PropTypes.func.isRequired,
  moduleProps: PropTypes.object,
};

export default AsyncComponent;
