import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import _ from 'lodash';


const styles = {
  rootContainer: {
    marginTop: 30,
  },
  characterSelectContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  characterSelectForm: {
    minWidth: 100,
  }
};


class ConversationInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedCharacter: 'None',
      text: ''
    }
  }


  renderCharacterItems = () => {
    return _.map(this.props.characters, (value, key) => {
      return <MenuItem key={key} value={key}>{key}</MenuItem>
    });
  };


  handleCharacterChange = (event) => {
    this.setState({ selectedCharacter: event.target.value});
  };


  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };


  onAddMessage = () => {
    const { selectedCharacter, text } = this.state;
    this.props.onMessageAdded(selectedCharacter, text);
    this.setState({ text: '' });
  };


  render() {
    const { rootContainer, characterSelectContainer, characterSelectForm } = this.props.classes;
    const { text, selectedCharacter } = this.state;

    return (
      <Grid container alignItems={"center"} className={rootContainer} justify={"center"}>
        <Grid item className={characterSelectContainer}>
          <FormControl className={characterSelectForm}>
            <InputLabel htmlFor="character">Character</InputLabel>
            <Select value={selectedCharacter}
              onChange={this.handleCharacterChange}
              inputProps={{ id: 'character' }}>
              {this.renderCharacterItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs >
          <TextField value={text} onChange={this.handleTextChange} fullWidth margin={"normal"} variant={"filled"}/>
        </Grid>
        <Grid className={characterSelectContainer}>
          <Button color={"primary"} variant={"fab"} onClick={this.onAddMessage}>
            <SendIcon/>
          </Button>
        </Grid>
      </Grid>
    )
  }
}


export default (withStyles(styles)(ConversationInput)) ;