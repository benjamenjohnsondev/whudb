import React, {
  Component
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  }
});

class Sets extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h1">Sets</Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Sets);
