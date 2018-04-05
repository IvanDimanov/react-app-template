import React, { Component, Children, cloneElement } from 'react'
import { withStyles } from 'material-ui/styles'

import Header from './Header'

const styles = (theme) => ({
  main: theme.typography.body1
})

class Layout extends Component {
  state = {
    avatar: {}
  }

  setAvatar = (avatar = {}) => this.setState((state) => ({
    ...state,
    avatar
  }))

  render () {
    const { children, classes } = this.props
    const { avatar } = this.state

    const childrenWithProps = Children.map(children, (child) => cloneElement(child, {moduleProps: {setAvatar: this.setAvatar}}))

    return (
      <div className={classes.main}>
        <Header avatar={avatar} setAvatar={this.setAvatar} />
        {childrenWithProps}
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
