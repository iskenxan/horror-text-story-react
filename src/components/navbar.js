import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/icons/Input';
import { Redirect } from 'react-router-dom';
import { logoutAction} from "../actions/user/logout";


const styles = {
  menuButton: {
    marginRight: 20,
  }
};


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false,
      myProfileClicked: false,
    }
  }


  toggleDrawer = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };


  renderMenuList = () => {
    return (
      <List>
        <ListItem button onClick={() => this.setState({ myProfileClicked: true })}>
          <ListItemIcon>
            <AccountCircle/>
          </ListItemIcon>
          <ListItemText primary="My Profile"/>
        </ListItem>
        <ListItem button onClick={() => this.props.logoutAction(this.props.token)}>
          <ListItemIcon>
            <Input/>
          </ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItem>
      </List>
    )
  };


  renderNavbar = () => {
    const { menuButton } = this.props.classes;

    return (
        <AppBar position={"static"}>
          <ToolBar>
            <IconButton className={menuButton} color={"inherit"} onClick={this.toggleDrawer}>
              <MenuIcon/>
            </IconButton>
            <Typography variant={"title"} color={"inherit"}>
              {this.props.title}
            </Typography>
          </ToolBar>
        </AppBar>
    )
  };


  render() {
    const { myProfileClicked } = this.state;
    return(
      <div>
        { !this.props.token && <Redirect to="/"/> }
        { myProfileClicked && <Redirect to="/me"/> }
        {this.renderNavbar()}
        <Drawer anchor={"left"} open={this.state.drawerOpen} onClose={this.toggleDrawer}>
          {this.renderMenuList()}
        </Drawer>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  token: state.user.token
});


export default connect(mapStateToProps, { logoutAction })(withStyles(styles)(Navbar));