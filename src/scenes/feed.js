import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../components/navbar';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar title="My Feed">

        </Navbar>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(Feed));