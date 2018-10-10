import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CirclePicker } from 'react-color';
import Popper from '@material-ui/core/Popper';


const styles = {
  root: {
    width: '100%'
  },
  topButtonsContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  topButton: {
    marginRight: 10
  },
  paper: {
    marginTop: 30,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30
  }

};

class AddStory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colorPickerOpen: false,
      pickerAnchor: null,
    }
  }


  renderTopButtons = ({topButton, topButtonsContainer}) => {
    return (
      <Grid container className={topButtonsContainer}  justify={"flex-start"}>
        <Button className={topButton} color={"secondary"}>
          Cancel
        </Button>
        <Button className={topButton} color={"link"}>
          Save Draft
        </Button>
        <Button className={topButton} variant={"contained"} color={"primary"}>
          Publish
        </Button>
      </Grid>
    )
  };


  openColorPicker = (event) => {
    const { currentTarget } = event;
    this.setState({colorPickerOpen: !this.state.colorPickerOpen, pickerAnchor: currentTarget});
  };


  renderColorPicker = () => (
    <Popper anchorEl={this.state.pickerAnchor} open={this.state.colorPickerOpen}>
      <Paper style={{padding:10}}>
        <CirclePicker/>
      </Paper>
    </Popper>
  );

  renderAddCharacter = () => (
    <Grid container
          alignItems={"center"}>
      <Grid
        item
        xs={8}>
        <TextField
          margin={"normal"}
          label="Add Character"
          fullWidth
          variant={"filled"}/>
      </Grid>
      <Grid
        item
        xs>
        <Grid container
              justify={"center"}>
          <Button onClick={this.openColorPicker}>
            Pick Color
          </Button>
        </Grid>
      </Grid>
      <Button variant={"contained"} color={"primary"}>
        Add
      </Button>
      {this.renderColorPicker()}
    </Grid>
  );


  render() {
    const { root, paper}  = this.props.classes;
    return (
      <div className={root}>
        <Grid
          container
          justify={"center"}>
          <Grid
            item
            xs={10}>
            {this.renderTopButtons(this.props.classes)}
            <Paper className={paper}>
              <TextField
                label="Title"
                fullWidth
                margin={"normal"}
                variant={"filled"}/>
              { this.renderAddCharacter() }
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  token: state.user.token,
});


export default withRouter(connect(mapStateToProps)(withStyles(styles)(AddStory)));