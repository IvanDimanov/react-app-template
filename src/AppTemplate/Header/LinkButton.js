import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = () => ({
  Link: {
    textDecoration: 'none'
  }
})

const LinkButton = ({ classes, location, path, label }) => <Link
  className={classes.Link}
  to={path}
>
  <Button color={location.pathname === path ? 'accent' : 'contrast'}>{label}</Button>
</Link>

export default withStyles(styles)(withRouter(LinkButton))
