import React, {Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TopUserInfo from './components/top-user-info';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Navbar from '../../components/navbar';
import SnackBar from '@material-ui/core/Snackbar';
import Draft from './components/draft-item';
import Published from './components/published-item';
import {
  getDraftAction
} from "../../actions/user/new-post";
import { saveProfileImageAction } from "../../actions/user/profile-image";


const styles = {
  root: {
    height: '100%',
  },
  paper: {
    marginTop: 40,
    marginBottom: 40,
    padding: 25
  },
  avatar: {
    width: 100,
    height: 100
  },
  hr: {
    marginTop: 30,
    marginBottom: 50
  },
  userNumbers: {
    paddingLeft: 50,
    paddingRight: 50
  },
  buttonContainer: {
    padding: 20
  },
  tabContainer: {
    marginTop: 60
  }
};


class MyProfile extends Component {
  constructor(props) {
    super(props);
    let snackBarOpen = false;
    let snackBarMessage = '';
    this.uploadRef = null;
    this.state = {
      tabsValue: 0,
      snackBarOpen,
      snackBarMessage,
      profileImageFile: null,
      profileImageFileSrc: null,
    }
  }


  componentWillMount() {
    if (this.props.location.state && this.props.location.state.message) {
      this.setState({ snackBarOpen: true, snackBarMessage: this.props.location.state.message });
      this.props.history.replace({
        pathname: this.props.location.pathname,
        state: {}
      });
    }
  }


  handleTabChange = (event, value) => {
    this.setState({tabsValue: value});
  };


  onAddStoryClick = () => {
    this.props.history.push('/add-story');
  };


  onViewPublished = (id) => {
    this.props.history.push(`/view-story/${id}`);
  };


  renderPublished = () => {
    const { published } = this.props.user.stories;
    if (published && Object.keys(published).length > 0) {
      return (
        <Grid item xs>
          { _.map(published, (value, key) =>
            <Published
              key={key}
              onView={this.onViewPublished}
              id={key}
              title={value.title}/>
          )
          }
        </Grid>
      )
    }
    return <div>No published</div>
  };


  onDraftEdit = (id) => {
    this.props.getDraftAction(id, this.props.user.token);
    this.props.history.push('/add-story');
  };


  renderDrafts = () => {
    const { drafts } = this.props.user.stories;
    if (drafts && Object.keys(drafts).length > 0) {
      return (
        <Grid item xs>
          { _.map(drafts, (value, key) =>
            <Draft
              key={key}
              onEdit={() => this.onDraftEdit(key)}
              id={key}
              title={value.title}/>
            )
          }
        </Grid>
      )
    }
    return <div>No drafts</div>
  };


  onProfileImageClicked = () => {
    this.uploadRef.click();
  };


  handleSelectedFile = event => {
    const { token } = this.props.user;
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      saveProfileImageAction(base64, token);
      this.setState({ profileImageFileSrc: base64, profileImageFile: selectedFile })
    };
  };


  render() {
    const { paper, hr, tabContainer } = this.props.classes;
    const { username, followers, following, profileImage } = this.props.user.user;
    const { published } = this.props.user.stories;
    const { tabsValue, snackBarOpen, snackBarMessage, profileImageFileSrc } = this.state;
    return (
      <div>
        <Navbar
          title='My Profile'/>
        <Grid container
              justify={"center"}>
          <Grid item xs={8} >
            <Paper  className={paper}>
              <TopUserInfo
                username={username}
                posts={published ? Object.keys(published).length : 0}
                followers={followers ? Object.keys(followers).length : 0 }
                following={following ? Object.keys(following).length : 0}
                classes={this.props.classes}
                imageFile={ profileImageFileSrc || profileImage }
                onImageClicked={this.onProfileImageClicked}
              />
              <hr className={hr}/>
              <Grid item xs>
                <Button variant={"contained"} color={"primary"} onClick={this.onAddStoryClick}>
                  Add Story
                </Button>
              </Grid>
              <Grid className={tabContainer} item xs>
                <Tabs
                  value={tabsValue}
                  onChange={this.handleTabChange}
                  indicatorColor={"primary"}
                  textColor={"primary"}
                  fullWidth
                  centered>
                  <Tab label={"Published"}/>
                  <Tab label={"Drafted"} />
                </Tabs>
              </Grid>
              { tabsValue === 0 && this.renderPublished() }
              { tabsValue === 1 && this.renderDrafts() }
            </Paper>
          </Grid>
        </Grid>
        <input
          type="file"
          style={{display: 'none'}}
          onChange={this.handleSelectedFile}
          ref={(element) => this.uploadRef = element}
        />
          <SnackBar
            open={snackBarOpen}
            message={snackBarMessage}
            onClose={() => this.setState({ snackBarOpen: false })}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user
});


const actions = {
  getDraftAction,
};


export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(MyProfile)));