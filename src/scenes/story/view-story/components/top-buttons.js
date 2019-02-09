import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const TopButtons = ({ classes, onBack, onUnpublish }) => {
  return (
    <Grid container className={classes.topButtonsContainer}  justify={"flex-start"}>
      <Button onClick={onBack} className={classes.topButton} >
        Back
      </Button>
      <Button onClick={onUnpublish} className={classes.topButton} variant={"contained"}>
        Unpublish
      </Button>
    </Grid>
  )
};

export default TopButtons;