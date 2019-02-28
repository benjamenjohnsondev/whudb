import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Typography, List, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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
      <div className={classes.root +" "+ "test"}>
        <List component="nav">
          <ListItem>
            <Typography variant="h6">Menu</Typography>
          </ListItem>
          <NavLink onClick={this.props.closeMenu('left', false)} to="/">
            <ListItem selected={this.state.selectedIndex === '/'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </NavLink>
          <ListItem selected={this.state.selectedIndex === '/page'}>
            <NavLink onClick={this.props.closeMenu('left', false)} to="/page">
              <ListItemText>Page</ListItemText>
            </NavLink>
          </ListItem>
        </List>
      </div>
    );
  }
}

NavItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavItems));
