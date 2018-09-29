import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';


class App extends Component {
  render() {
    return(
      <div id={"app"}>
        <CssBaseline />
        <Routes/>
      </div>
      )
  }
}

export default App;
