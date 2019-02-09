import React from 'react';
import Paper from '@material-ui/core/Paper';


const paper = {
  marginTop: 30,
  marginBottom: 50,
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 30,
  paddingRight: 30
};


const PaperContainer = ({ children }) => {
  return (
    <Paper style={paper}>
      { children }
    </Paper>
  )
};

export default PaperContainer;