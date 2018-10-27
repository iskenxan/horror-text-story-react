import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const TopButtons = ({ classes, onCancel, onSaveDraft, onDelete, showDelete, onPublish }) => {
  return (
    <Grid container className={classes.topButtonsContainer}  justify={"flex-start"}>
      <Button onClick={onCancel} className={classes.topButton} >
        Cancel
      </Button>
      { showDelete &&
      <Button onClick={onDelete} className={classes.topButton} color="secondary">
        Delete
      </Button>}
      <Button className={classes.topButton} onClick={onSaveDraft}>
        Save Draft
      </Button>
      <Button onClick={onPublish} className={classes.topButton} variant={"contained"} color={"primary"}>
        Publish
      </Button>
    </Grid>
  )
};

export default TopButtons;