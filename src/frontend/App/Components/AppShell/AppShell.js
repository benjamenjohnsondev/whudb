import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import NavItems from '../Menu/NavItems';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    width: 250
  }
};

class AppShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  }

  render() {
    const { classes } = this.props;
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          disableBackdropTransition={!iOS} disableDiscovery={iOS}
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <NavItems closeMenu={this.toggleDrawer}/>
        </SwipeableDrawer>
      </div>
    );
  }
}

AppShell.propTypes = {
  'classes': PropTypes.object.isRequired
};

export default withStyles(styles)(AppShell);
