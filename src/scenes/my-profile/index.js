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
    this.state = {
      tabsValue: 0
    }
  }


  handleTabChange = (event, value) => {
    this.setState({tabsValue: value});
  };


  onAddStoryClick = () => {
    this.props.history.push('/add-story');
  };


  render() {
    const { fullWidth, paper, hr, tabContainer, buttonContainer } = this.props.classes;
    const { username, postRefs, followers, following } = this.props.user.user;
    const { tabsValue } = this.state;

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
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user
});


export default withRouter(connect(mapStateToProps)(withStyles(styles)(MyProfile)));