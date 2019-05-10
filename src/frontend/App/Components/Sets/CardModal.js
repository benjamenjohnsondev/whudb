import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Modal } from '@material-ui/core';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});


class CardModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.modalOpen}
        onClose={this.props.handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Text in a modal
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <SimpleModalWrapped />
        </div>
      </Modal>
    );
  }
}

const SimpleModalWrapped = withStyles(styles)(CardModal);

export default SimpleModalWrapped;
