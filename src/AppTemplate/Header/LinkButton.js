import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = () => ({
  Link: {
    textDecoration: 'none'
  },

  ButtonSelected: {
    color: 'white'
  },

  ButtonNotSelected: {
    color: 'grey'
  }
})

const LinkButton = ({ classes, location, path, label }) => <Link
  className={classes.Link}
  to={path}
>
  <Button className={location.pathname === path ? classes.ButtonSelected : classes.ButtonNotSelected}>{label}</Button>
</Link>

export default withStyles(styles)(withRouter(LinkButton))
