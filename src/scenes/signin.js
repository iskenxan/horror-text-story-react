import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Appbar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { loginAction } from "../actions/user/login";
import { signupAction } from "../actions/user/signup";
import { resetRequestStateAction } from "../actions/request-status-actions";
import { Redirect, withRouter } from 'react-router-dom';
import SnackBar from '@material-ui/core/Snackbar';


const styles = () => ({
  root: {
    height: '100%'
  },
  form: {

  },
  formInput: {
    marginTop: 15
  }
});


const TabContainer = (props) => (
  <div style={{padding: 16}}>
    {props.children}
  </div>
);


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      username: '',
      password: '',
      repeatPassword: '',
      snackBarOpen: false,
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.user);
    if (newProps.status.error) {
      this.setState({
        username: '',
        password: '',
        repeatPassword: '',
        snackBarOpen: true
      })
    }
  }



  onSignupClick = () => {
    const { username, password, repeatPassword } = this.state;
    this.props.signupAction(username, password, repeatPassword);
  };

  onLoginClick = () => {
    const { username, password } = this.state;
    this.props.loginAction(username, password);
  };


  handleInputChange = field => event => {
    this.setState({[field]: event.target.value});
  };


  getLoginTab = (classes) => {
    return (
      <form>
        <TextField
          className={classes.formInput}
          margin="normal"
          label="Username"
          placeholder="your username..."
          fullWidth
          value={this.state.username}
          onChange={this.handleInputChange('username')}
          variant={"outlined"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <TextField
          className={classes.formInput}
          margin="normal"
          label="Password"
          placeholder="your password..."
          fullWidth
          value={this.state.password}
          onChange={this.handleInputChange('password')}
          variant={"outlined"}
          type={"password"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={this.onLoginClick}>Login</Button>
      </form>
    )
  };


  getSignupTab = (classes) => {
    return (
      <form>
        <TextField
          className={classes.formInput}
          margin="normal"
          label="Username"
          placeholder="your username..."
          fullWidth
          value={this.state.username}
          onChange={this.handleInputChange('username')}
          variant={"outlined"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <TextField
          className={classes.formInput}
          margin="normal"
          label="Password"
          placeholder="your password..."
          fullWidth
          value={this.state.password}
          onChange={this.handleInputChange('password')}
          variant={"outlined"}
          type={"password"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <TextField
          className={classes.formInput}
          margin="normal"
          label="Password"
          placeholder="repeat password..."
          fullWidth
          value={this.state.repeatPassword}
          onChange={this.handleInputChange('repeatPassword')}
          variant={"outlined"}
          type={"password"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={this.onSignupClick}>Signup</Button>
      </form>
    )
  };


  handleTabChange = (event, value) =>{
    this.setState({ value });
  };


  getForm = (classes) => {
    const { value } = this.state;
    return (
      <Paper className={classes.form}>
        <Grid>
          <Appbar position={"static"}>
            <Tabs value={value} onChange={this.handleTabChange} fullWidth>
              <Tab label="Login"/>
              <Tab label="Sign Up"/>
            </Tabs>
          </Appbar>
          {value === 0 &&
          <TabContainer>
            {this.getLoginTab(classes)}
          </TabContainer>}
          {value === 1 &&
          <TabContainer>
            {this.getSignupTab(classes)}
          </TabContainer>}
        </Grid>
      </Paper>
    );
  };


  handleSnackBarClose = () => {
    this.setState({snackBarOpen: false});
    this.props.resetRequestStateAction();
  };


  getSnackBar =() => {
    const { errorMessage } = this.props.status;
    return (
      <SnackBar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={this.state.snackBarOpen}
        message={errorMessage}
        onClose={this.handleSnackBarClose}
      />
    )
  };


  render() {
    if (this.props.user.token) {
      return(
        <Redirect to="/me" />
        )
    }
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} justify={"center"} alignItems={"center"}>
          <Grid item  xs={6}>
            {this.getForm(classes)}
          </Grid>
        {this.getSnackBar()}
      </Grid>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user,
  status: state.requestStatus
});

export default withRouter(connect(mapStateToProps, { loginAction, signupAction, resetRequestStateAction })(withStyles(styles)(SignIn)));
