import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPublishedAction, cancelStory, unpublishPostAction } from "../../../actions/user/new-post";
import PaperContainer from '../components/paper-container';
import Grid from '@material-ui/core/Grid';
import TopButtons from './components/top-buttons';

import ConversationList from '../components/conversation-list';


const styles = {
  root: {
    width: '100%',
  },
  topButtonsContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  topButton: {
    marginRight: 10
  },
};


class ViewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirected: false,
    }
  }


  componentWillMount() {
    const { id } = this.props.match.params;
    const { token } = this.props;
    this.props.getPublishedAction(id, token)
  }


  onBackClicked = () => {
    this.props.cancelStory();
    this.setState({ redirected: true });
  };


  onUnpublish = () => {
    const { token, story } = this.props;
    this.props.unpublishPostAction(story.id, token);
    this.setState({ redirected: true });
  };


  render() {
    const { redirected } = this.state;
    const { root } = this.props.classes;
    const { dialog, characters } = this.props.story;
    return (
      <div className={root}>
        {redirected && <Redirect to='/me'/>}
        <Grid container justify={"center"}>
          <Grid item xs={8}>
            <TopButtons
              onUnpublish={this.onUnpublish}
              onBack={this.onBackClicked}
              classes={this.props.classes}
            />
            <PaperContainer>
              <ConversationList
                dialog={dialog}
                characters={characters}
              />
            </PaperContainer>
          </Grid>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  token: state.user.token,
  story: state.user.newStory,
});


const actions = {
  getPublishedAction,
  cancelStory,
  unpublishPostAction
};


export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(ViewStory)));