import React, { PureComponent } from 'react'
import { CircularProgress } from 'material-ui/Progress'

export default class AsyncComponent extends PureComponent {
  state = {
    Component: null
  }

  componentWillMount () {
    if (!this.state.Component) {
      this.props.moduleProvider()
        .then(({ default: Component }) => this.setState({ Component }))
    }
  }

  render () {
    const { Component } = this.state
    return Component ? <Component /> : <CircularProgress />
  }
}
