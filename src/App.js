import React, { Component } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';


class App extends Component {
  render() {
    return(
      <div id={"app"}>
        <CssBaseline />
        <Routes
          token={this.props.user.token}/>
      </div>
      )
  }
}

const mapStateToProps= (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
