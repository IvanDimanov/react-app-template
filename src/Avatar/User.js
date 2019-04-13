import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import LazyLoad from 'react-lazy-load';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {CommonContext} from 'AppTemplate/CommonContext';
import {AvatarContext} from './AvatarContext';

import styles from './styles';

const User = ({classes, result}) => {
  const {setAvatar} = useContext(CommonContext);
  const {isSearchLoading, loadUserRepos} = useContext(AvatarContext);

  return (
    <Card className={classes.Card}>
      <LazyLoad height={styles.CardMedia.height}>
        <CardMedia
          title={`Image of ${result.login}`}
          image={result.avatar_url}
          className={classes.CardMedia}
        />
      </LazyLoad>

      <CardContent className={classes.CardContent}>
        <Typography type='headline' component='h2' noWrap>{result.login}</Typography>

        <Typography component='p'><b>Score:</b> {result.score}</Typography>
      </CardContent>

      <CardActions className={classes.CardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => loadUserRepos(result.login)}
          disabled={isSearchLoading}
        >
          Load Repos
        </Button>

        <Button
          size='small'
          color='primary'
          onClick={() => setAvatar(result)}
        >
          Set as Avatar
        </Button>
      </CardActions>
    </Card>
  );
};

User.propTypes = {
  classes: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
