import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import CenteredPage from 'common/CenteredPage';

import {AvatarContext, AvatarContextProvider} from './AvatarContext';

import styles from './styles';

import User from './User';
import UserRepo from './UserRepo';

const Avatar = ({classes}) => {
  const {searchName, isSearchLoading, searchUsers, userRepos, setSearchName, searchForUser} = useContext(AvatarContext);

  const submitOnEnterKey = (event) => event.key === 'Enter' ? searchForUser(searchName) : null;

  return (
    <CenteredPage className={classes.CenteredPage}>
      <TextField
        type='search'
        label='Search GitHub User'
        value={searchName}
        onChange={setSearchName}
        onKeyPress={submitOnEnterKey}
        disabled={isSearchLoading}
        autoFocus
      />

      <br />
      <br />

      <Grid container>
        <Grid item xs={7}>
          {searchUsers.length
            ? searchUsers.map((result, index) => <User key={index} result={result} />)
            : <Typography component='p'>No users found</Typography>
          }
        </Grid>

        <Grid item xs={5}>{userRepos.map((repo, index) => <UserRepo key={index} repo={repo} />)}</Grid>
      </Grid>
    </CenteredPage>
  );
};

Avatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const AvatarContextWrap = (props) => (
  <AvatarContextProvider>
    <Avatar {...props} />
  </AvatarContextProvider>
);

export default withStyles(styles)(AvatarContextWrap);
