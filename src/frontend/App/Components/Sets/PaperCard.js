import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardHeader, IconButton, Avatar } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Remove as RemoveIcon } from '@material-ui/icons';


const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  cardImage: {
    maxWidth: '100%',
  },
  cards: {
    margin: theme.spacing.unit * 2,
  },
  icon: {
    alignSelf: 'center'
  }
});

class PaperCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isToggleOn: true,
    };
    this.classes = this.props;
  }
  toggleSet() {
    var existing = localStorage.getItem('sets');
    existing = existing ? existing.split(',') : [];

    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    if (existing.includes(this.props.id)) {
      let i = existing.indexOf(this.props.id);
      existing.splice(i, 1);
    } else {
      existing.push(this.props.id)
    };
    localStorage.setItem('sets', existing.toString());
  }
  debug(val) {

  }
  componentDidMount() {
    var sets = localStorage.getItem('sets');
    sets = sets ? sets.split(',') : [];

    if (sets.includes(this.props.id)) {
      this.setState(() => ({
        isToggleOn: false,
      }));
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid item key={this.props.id} xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            classes={{
              action: classes.icon
            }}
            avatar={
              <IconButton onClick={this.debug(classes)}>
                <Avatar
                  src={this.props.image.url}
                  aria-label={this.props.name}
                />
              </IconButton>
            }
            action={
              <IconButton className={classes.icon} onClick={this.toggleSet.bind(this)}>
                {this.state.isToggleOn ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            }
            title={this.props.name}
          />
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(PaperCard);
