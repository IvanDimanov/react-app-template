import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import {CommonContext} from 'AppTemplate/CommonContext';

import LinkButton from './LinkButton';

const styles = {
  flex: {
    flex: 1,
  },
};

const Header = ({classes}) => {
  const {avatar, setAvatar} = useContext(CommonContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpened = Boolean(anchorEl);

  const openMenu = ({currentTarget}) => setAnchorEl(currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const openUserProfile = () => window.open(avatar.html_url);

  const logOut = () => {
    setAnchorEl(null);
    setAvatar(null);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography className={classes.flex}>
          <LinkButton path='/' label='Home' />
          <LinkButton path='/avatar' label='Avatar' />
        </Typography>

        {(avatar || {}).id && (
          <div>
            <IconButton
              aria-owns={isMenuOpened ? 'menu-appbar' : null}
              aria-haspopup
              color='inherit'
              onClick={openMenu}
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
                horizontal: 'right',
              }}

              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

              open={isMenuOpened}
              onClose={closeMenu}
            >
              <MenuItem
                title={avatar.html_url}
                onClick={openUserProfile}
              >
                Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={logOut}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
