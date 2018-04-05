import React from 'react'
import { withStyles } from 'material-ui/styles'

import Grid from 'material-ui/Grid'

const styles = (theme) => ({
  GridContainer: {
    margin: `0px ${theme.spacing.unit * -2}px`
  }
})

const CenteredGrid = ({ children, classes, className }) => (
  <Grid container justify='center' className={classes.GridContainer}>
    <Grid item className={className}>
      {children}
    </Grid>
  </Grid>
)

export default withStyles(styles)(CenteredGrid)
