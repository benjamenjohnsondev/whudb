import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { LibraryAdd as LibraryAddIcon } from '@material-ui/icons';
import { addToDb, __dbInit } from '../../../data/Helpers';

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
  header: {
    marginBottom: '.5em',
  },
  wrapper: {
    maxWidth: "100%",
    margin: 16
  }
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
        <Grid item className={this.classes.paper} key={id} xs={12} sm={6} md={4}>
          <Card>
            <CardHeader
              avatar={<Avatar src={image.url} aria-label={name} />}
              action={
                <IconButton className={this.classes.icon}>
                  <LibraryAddIcon />
                </IconButton>
              }
              title={name}
            />
            {/* <CardContent>
              <Typography>{name}</Typography>
            </CardContent> */}
          </Card>
        </Grid>
      );
    };
  }
  componentDidMount() {
    const dataURL = '/api',
      param = '?query={allSets{id,name,image{width,height,url}}}';

    fetch(dataURL + param)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong!');
      })
      .then(res => {
        this.setState({
          data: res.data.allSets,
        });
        __dbInit();
        addToDb(data);
      })
      .then(res => {
        console.table(this.state.data);
      })
      .catch(Error);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography className={classes.header} variant="h1">
            Sets
          </Typography>
          <Typography variant="body1">Click the library icon to add your sets</Typography>
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
