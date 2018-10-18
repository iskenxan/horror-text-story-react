import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SnackBar from '@material-ui/core/Snackbar';
import TopButtons from './components/top-buttons';
import AddCharacter from './components/add-character';
import {
  addCharacterAction,
  removeCharacterAction,
  addDialogMessageAction,
  removeDialogMessageAction,
  cancelStory,
  saveTitleAction,
  saveDraftAction
} from "../../actions/user/new-post";
import CharacterList from './components/character-list';
import ConversationList from './components/conversation-list';
import ConversationInput from './components/conversation-input';
import { Redirect } from 'react-router-dom';


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
    marginBottom: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30
  },
  conversationContainer: {
    marginTop:40
  }
};


class AddStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirected: false,
      redirectMessage: '',
      title:'',
      snackBarOpen: false
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error) {
      this.setState({ snackBarOpen: true });
    }
    console.log(nextProps.drafts, this.props.drafts);
    if (this.props.drafts.length < nextProps.drafts.length) {
      this.setState({ redirected: true, redirectMessage: 'Draft was saved.' })
    }
    if (nextProps.story && nextProps.story.title) {
      this.setState({ title: nextProps.story.title })
    }
  }


  onTitleChange = (event) => {
    this.setState({ title: event.target.value});
  };


  onAddCharacter = (name, color, isMain) => {
    this.props.addCharacterAction(name, color, isMain);
  };


  onRemoveCharacter = (name) => {
    this.props.removeCharacterAction(name);
  };


  onNewMessage = (name, text) => {
    const { dialogCount } = this.props.story;
    this.props.addDialogMessageAction({
      id: dialogCount,
      name,
      text
    })
  };


  onCancel = () => {
    this.props.cancelStory();
    this.setState({ redirected: true });
  };


  saveDraft = () => {
    const { token, story } = this.props;
    this.props.saveTitleAction(this.state.title);
    this.props.saveDraftAction({ ...story, title: this.state.title }, token);
  };


  render() {
    const { root, paper, conversationContainer } = this.props.classes;
    const { redirected, redirectMessage, title } = this.state;

    const { characters, dialog } = this.props.story;
    const { error } = this.props;

    return (
      <div className={root}>
        { redirected && <Redirect to={{
          pathname: "/me",
          state: { message: redirectMessage },
          }}/>
        }
        <Grid
          container
          justify={"center"}>
          <Grid
            item
            xs={8}>
            <TopButtons
              classes={this.props.classes}
              onCancel={this.onCancel}
              onSaveDraft={this.saveDraft}/>
            <Paper className={paper}>
              <TextField
                label="Title"
                fullWidth
                margin={"normal"}
                value={title}
                onChange={this.onTitleChange}
                />
              <AddCharacter
                onAddCharacter={this.onAddCharacter}
                />
              <CharacterList
                onCharacterDelete={this.onRemoveCharacter}
                characters={characters}/>
              <Grid item xs className={conversationContainer}>
                <ConversationList
                  dialog={dialog}
                  characters={characters}
                  />
                <ConversationInput
                  characters = {characters}
                  onMessageAdded={this.onNewMessage}
                  />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <SnackBar
          open={this.state.snackBarOpen}
          message={error}
          onClose={() => this.setState({ snackBarOpen: false })}
          anchorOrigin={{
            vertical:'bottom',
            horizontal: 'center'
          }}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  token: state.user.token,
  story: state.user.newStory,
  error: state.user.requestError,
  drafts: state.user.stories.drafts,
});


const actions = {
  addCharacterAction,
  removeCharacterAction,
  addDialogMessageAction,
  removeDialogMessageAction,
  cancelStory,
  saveDraftAction,
  saveTitleAction
};


export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(AddStory)));