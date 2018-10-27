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
  saveDraftAction,
  updateDraftAction,
  deleteDraftAction,
  publishDraftAction
} from "../../actions/user/new-post";
import {
  SAVE_DRAFT_SUCCESS,
  UPDATE_DRAFT_SUCCESS,
  DELETE_DRAFT_SUCCESS,
  PUBLISH_DRAFT_SUCCESS
} from "../../actions/user/new-post";
import { resetRequestStateAction } from "../../actions/request-status-actions";
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
      title: this.props.story.title || '',
      snackBarOpen: false
    }
  }


  getRequestResultMessage = (type) => {
    let redirectMessage = 'Draft was saved';
    if (type === DELETE_DRAFT_SUCCESS) {
      redirectMessage = 'Draft was deleted';
    }
    if (type === PUBLISH_DRAFT_SUCCESS) {
      redirectMessage = 'Draft was published';
    }

    return redirectMessage;
  };


  componentWillReceiveProps(nextProps) {
    const { error, success, type } = nextProps.status;
    if (nextProps){
      console.log(nextProps.status);
    }

    if (error) {
      this.setState({ snackBarOpen: true });
    }

    if (success && (type === SAVE_DRAFT_SUCCESS || type === UPDATE_DRAFT_SUCCESS
      || type === DELETE_DRAFT_SUCCESS || type === PUBLISH_DRAFT_SUCCESS)) {
      const redirectMessage = this.getRequestResultMessage(type);
      this.setState({ redirected: true, redirectMessage });
      this.props.resetRequestStateAction();
    }
    if (nextProps.story && nextProps.story.title) {
      this.setState({ title: nextProps.story.title })
    }
  };


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


  onDeleteDraft = () => {
    const { token, story, deleteDraftAction } = this.props;
    deleteDraftAction(story.id, token);
  };


  saveDraft = () => {
    const { token, story, updateDraftAction, saveDraftAction } = this.props;
    this.props.saveTitleAction(this.state.title);
    if (story.id) {
      updateDraftAction({ ...story, title: this.state.title }, token)
    } else {
      saveDraftAction({ ...story, title: this.state.title }, token);
    }
  };


  onPublish = () => {
    const { token, story, publishDraftAction, saveTitleAction} = this.props;
    saveTitleAction(this.state.title);
    publishDraftAction({ ...story, title: this.state.title }, token);
  };

  onCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
    this.props.resetRequestStateAction();
  };

  render() {
    const { root, paper, conversationContainer } = this.props.classes;
    const { redirected, redirectMessage, title } = this.state;

    const { characters, dialog, id } = this.props.story;
    const { errorMessage: error } = this.props.status;

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
              onPublish={this.onPublish}
              onCancel={this.onCancel}
              onSaveDraft={this.saveDraft}
              showDelete={id}
              onDelete={this.onDeleteDraft}/>
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
          onClose={this.onCloseSnackbar}
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
  status: state.requestStatus,
});


const actions = {
  addCharacterAction,
  removeCharacterAction,
  addDialogMessageAction,
  removeDialogMessageAction,
  cancelStory,
  saveDraftAction,
  saveTitleAction,
  updateDraftAction,
  resetRequestStateAction,
  deleteDraftAction,
  publishDraftAction,
};


export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(AddStory)));