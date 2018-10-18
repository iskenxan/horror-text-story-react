import React, {Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import {
  getDraftAction
} from "../../actions/user/new-post";


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
    this.state = {
      tabsValue: 0,
      snackBarOpen,
      snackBarMessage
    }
  }


  componentWillMount() {
    if (this.props.location.state && this.props.location.state.message) {
      this.setState({ snackBarOpen: true, snackBarMessage: this.props.location.state.message })
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


  onDraftEdit = (id) => {
    this.props.getDraftAction(id, this.props.user.token);
    this.props.history.push('/add-story');
  };


  renderDrafts = () => {
    const { drafts } = this.props.user.stories;
    if (drafts && drafts.length > 0) {
      return (
        <Grid item xs>
          { drafts.map(draft =>
            <Draft
              onEdit={this.onDraftEdit}
              id={draft.id}
              title={draft.title}/>
            )
          }
        </Grid>
      )
    }
    return <div>No drafts</div>
  };


  render() {
    const { fullWidth, paper, hr, tabContainer } = this.props.classes;
    const { username, postRefs, followers, following } = this.props.user.user;
    const { tabsValue, snackBarOpen, snackBarMessage } = this.state;
    return (
      <div className={fullWidth}>
        <Navbar
          title='My Profile'/>
        <Grid container
              justify={"center"}>
          <Grid item xs={8} >
            <Paper  className={paper}>
              <TopUserInfo
                username={username}
                posts={Object.keys(postRefs).length}
                followers={Object.keys(followers).length}
                following={Object.keys(following).length}
                classes={this.props.classes}
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
              {tabsValue === 1 && this.renderDrafts()}
            </Paper>
          </Grid>
        </Grid>
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