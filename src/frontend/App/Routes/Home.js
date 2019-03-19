import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  content: {
    marginTop: theme.spacing.unit * 2,
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h1" >Home Page</Typography>
          <Typography className={classes.content}>This is some super homepage content</Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
