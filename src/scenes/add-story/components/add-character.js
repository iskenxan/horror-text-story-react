import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { CirclePicker } from 'react-color';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import CheckBox from '@material-ui/core/Checkbox';


class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: '',
      colorPickerOpen: false,
      pickerAnchor: null,
      pickerButtonColor: "#7D60D9",
      isSender: false,
    }
  }


  onColorChange = (color) => {
    this.setState({pickerButtonColor: color.hex, colorPickerOpen: !this.state.colorPickerOpen});
  };


  toggleColorPicker = (event) => {
    const { currentTarget } = event;
    this.setState({colorPickerOpen: !this.state.colorPickerOpen, pickerAnchor: currentTarget});
  };


  renderColorPicker = () => (
    <Popper anchorEl={this.state.pickerAnchor} open={this.state.colorPickerOpen}>
      <Paper style={{padding:10}}>
        <CirclePicker onChangeComplete={this.onColorChange}/>
      </Paper>
    </Popper>
  );


  addCharacter = () => {
    const { characterName, pickerButtonColor, isSender } = this.state;
    this.props.onAddCharacter(characterName, pickerButtonColor, isSender);
    this.setState({characterName: '', isSender: false });
  };


  onCharacterValueChange = (event) => {
    this.setState({characterName: event.target.value});
  };

  onIsSenderValueChange = () => {
    this.setState({ isSender: !this.state.isSender });
  };


  render() {
    const { characterName, isSender } = this.state;
    return (
      <Grid container
            alignItems={"center"}>
        <Grid item
          xs={6}>
          <TextField
            margin={"normal"}
            label="Add Character"
            value={characterName}
            onChange={this.onCharacterValueChange}
            fullWidth
            />
        </Grid>
        <Grid item xs>
          <Grid container justify={"center"} alignItems={"center"}>
            <span>Main Character</span>
                <CheckBox
                  checked={isSender}
                  onChange={this.onIsSenderValueChange}/>
          </Grid>
        </Grid>
        <Grid item
          xs>
          <Grid container
                justify={"center"}>
            <IconButton onClick={this.toggleColorPicker}>
              <Avatar style={{backgroundColor: this.state.pickerButtonColor}}/>
            </IconButton>
          </Grid>
        </Grid>
        <Button variant={"contained"} color={"primary"} onClick={this.addCharacter}>
          Add
        </Button>
        {this.renderColorPicker()}
      </Grid>
    );
  };
}

export default AddCharacter;