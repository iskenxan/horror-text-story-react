import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Appbar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';

const styles = theme => ({
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
      username: null,
      password: null,
      repeatPassword: null
    }
  }

  handleTabChange = (event, value) =>{
    this.setState({ value });
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
          variant={"outlined"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <Button variant={"contained"} color={"primary"}>Login</Button>
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
          variant={"outlined"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <TextField
          className={classes.formInput}
          margin="normal"
          label="Password"
          placeholder="repeat password..."
          fullWidth
          value={this.state.password}
          variant={"outlined"}
          InputLabelProps={{
            shrink: true,
          }}/>
        <Button variant={"contained"} color={"primary"}>Signup</Button>
      </form>
    )
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


  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} justify={"center"} alignItems={"center"}>
          <Grid item  xs={6}>
            {this.getForm(classes)}
          </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SignIn);
