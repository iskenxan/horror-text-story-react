import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const TopButtons = ({ classes, onCancel, onSaveDraft }) => {
  return (
    <Grid container className={classes.topButtonsContainer}  justify={"flex-start"}>
      <Button onClick={onCancel} className={classes.topButton} color={"secondary"}>
        Cancel
      </Button>
      <Button className={classes.topButton} onClick={onSaveDraft}>
        Save Draft
      </Button>
      <Button className={classes.topButton} variant={"contained"} color={"primary"}>
        Publish
      </Button>
    </Grid>
  )
};

export default TopButtons;