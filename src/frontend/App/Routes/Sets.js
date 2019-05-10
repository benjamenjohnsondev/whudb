import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid, Card, CardHeader, IconButton, Avatar } from '@material-ui/core';
import { LibraryAdd as LibraryAddIcon } from '@material-ui/icons';
import { loadData } from '../../../data/Helpers';
import PaperCard from '../Components/Sets/PaperCard';
import { AddRounded as AddIcon } from '@material-ui/icons';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  header: {
    marginBottom: '.5em',
  },
  wrapper: {
    maxWidth: '100%',
    margin: 16,
  },
});

class Sets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.classes = this.props;
    this.renderData = ({ id, name, image }) => {
      return (
        <PaperCard key={id} id={id} name={name} image={image}/>
      );
    };
  }
  componentDidMount() {
    if (window.__ROUTE_DATA__ && window.__ROUTE_DATA__.data) {
      this.setState({
        data: window.__ROUTE_DATA__.data,
      });
      delete window.__ROUTE_DATA__;
    } else {
      loadData('allSets{id,name,image{width,height,url}}').then(data => {
        this.setState({
          data: data.allSets,
        });
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography className={classes.header} variant="h1">
            Sets
          </Typography>
          <Typography variant="body1">Click the <AddIcon/> icon to add your sets</Typography>
        </Paper>
        <div className={classes.wrapper}>
          <Grid container spacing={24}>
            {/* <GridList cellHeight={200} spacing={1} className={classes.gridList}> */}
            {this.state.data.map(this.renderData)}
            {/* </GridList> */}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sets);
