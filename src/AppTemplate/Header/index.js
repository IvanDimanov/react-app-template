import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import Divider from 'material-ui/Divider'

import LinkButton from './LinkButton'

const styles = {
  flex: {
    flex: 1
  }
}

class Header extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    const { currentTarget } = event
    this.setState((state) => ({ ...state, anchorEl: currentTarget }))
  }

  handleClose = () => {
    this.setState((state) => ({ ...state, anchorEl: null }))
  }

  render () {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const { classes, avatar, setAvatar } = this.props

    return <AppBar
      position='static'
    >
      <Toolbar>
        <Typography className={classes.flex}>
          <LinkButton path='/' label='Home' />
          <LinkButton path='/avatar' label='Avatar' />
        </Typography>

        {(avatar || {}).id && (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup
              color='inherit'
              onClick={this.handleMenu}
            >
              <Avatar
                src={avatar.avatar_url}
                alt={`Image of ${avatar.login}`}
              />
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}

              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}

              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}

              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => window.open(avatar.html_url)}>
                Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={() => {
                this.handleClose()
                setAvatar()
              }}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  }
}

export default withStyles(styles)(Header)
