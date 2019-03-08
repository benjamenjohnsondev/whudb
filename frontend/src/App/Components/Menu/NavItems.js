import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Typography, List, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: 250,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: 0
  },
  menuTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  closeIcon: {
    fill: '#fff'
  }
});

class NavItems extends Component {
  state = {
    selectedIndex: this.props.location.pathname,
  };

  handleListItemClick = (index) => {
    this.setState({
      selectedIndex: index
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem className={classes.menuTitle}>
            <Typography variant="h6">Menu</Typography>
            <CloseIcon onClick={this.props.closeMenu('left', false)} className={classes.closeIcon}/>
          </ListItem>
          <NavLink onClick={this.props.closeMenu('left', false)} to="/">
            <ListItem selected={this.state.selectedIndex === '/'}>
              <ListItemIcon className={classes.icon}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </NavLink>
          <NavLink onClick={this.props.closeMenu('left', false)} to="/page">
            <ListItem selected={this.state.selectedIndex === '/page'}>
              <ListItemText>Page</ListItemText>
            </ListItem>
          </NavLink>
          <a onClick={this.props.closeMenu('left', false)} href="/api">
            <ListItem selected={this.state.selectedIndex === '/api'}>
              <ListItemText>Api</ListItemText>
            </ListItem>
          </a>
          <a onClick={this.props.closeMenu('left', false)} href="/404">
            <ListItem selected={this.state.selectedIndex === '/api'}>
              <ListItemText>404</ListItemText>
            </ListItem>
          </a>
        </List>
      </div>
    );
  }
}

NavItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavItems));
