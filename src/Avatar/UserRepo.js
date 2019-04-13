import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import secureUrlPrefix from 'utils/secureUrlPrefix';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const UserRepo = ({classes, repo}) => {
  const homepageUrl = secureUrlPrefix(repo.homepage);

  return (
    <Card className={classes.Card}>
      <CardContent>
        <Typography type='headline' component='h2' noWrap>{repo.name}</Typography>
        <Typography component='p'><b>Language: </b> {repo.language}</Typography>
        <br />
        <Typography component='p'>{repo.description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          size='small'
          color='primary'
          title={repo.html_url}
          onClick={() => window.open(repo.html_url)}
        >
          View Online
        </Button>

        <Button
          size='small'
          color='primary'
          title={homepageUrl}
          onClick={() => window.open(homepageUrl)}
          disabled={!repo.homepage}
        >
          Home page
        </Button>
      </CardActions>
    </Card>
  );
};

UserRepo.propTypes = {
  classes: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserRepo);
