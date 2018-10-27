import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const draftStyle = {
  marginTop: 10,
  padding: 15,
  marginBottom: 10,
  backgroundColor: '#F7F7F7'
};


const marginTopBottom = {
  marginTop: 10,
  marginBottom: 10
};


const dividerStyle = {
  border: 0,
  color: '#E0E0E0',
  backgroundColor: '#E0E0E0',
  height: 1
};

export default function({ id, title, onView }) {
  return (
    <div>
      <Grid style={draftStyle} key={id} alignItems={"center"} justify={"flex-start"} container>
        <Grid item xs={12} style={marginTopBottom}>
          <Typography
            style={{color: '#808080'}}
            variant={"headline"}>
            {title}
          </Typography>
          <hr style={dividerStyle}/>
        </Grid>
        <Button onClick={() => onView(id)} style={marginTopBottom} size={"small"} variant={"outlined"}>View</Button>
      </Grid>
    </div>
  );
}