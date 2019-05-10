import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardHeader, IconButton, Avatar, Modal } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Remove as RemoveIcon } from '@material-ui/icons';
import { deleteData, setData, getData, checkData, loadData } from '../../../../data/Helpers';
import CardModal from './CardModal';

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
    alignSelf: 'center',
  },
});

class PaperCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      modalOpen: false,
    };
    this.classes = this.props;
  }
  handleOpen = () => {
    this.setState({ modalOpen: true });
  };
  handleClose = () => {
    this.setState({ modalOpen: false });
  };
  loadCards(setId) {
    const query = `cardsBySet(id:${setId}){id,name,image{height,url,width}}`;
    loadData(query).then(data => {
      console.log(data);
      this.setState({
        data: data,
      });
    });
  }
  toggleSet() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }));

    if (this.state.isToggleOn) {
      return setData('sets', this.props.id, 'toggle');
    }

    return deleteData('sets', this.props.id, 'toggle');
  }
  componentWillMount() {
    const localData = getData('sets', this.props.id);
    if (localData && localData.includes(this.props.id)) {
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
          <CardModal modalOpen={this.state.modalOpen} onClose={this.handleClose} data={this.state.data}/>
          <CardHeader
            classes={{
              action: classes.icon,
            }}
            avatar={
              <IconButton onClick={() => this.loadCards(this.props.id)}>
              {/* <IconButton onClick={() => this.handleOpen}> */}
                <Avatar src={this.props.image.url} aria-label={this.props.name} />
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
