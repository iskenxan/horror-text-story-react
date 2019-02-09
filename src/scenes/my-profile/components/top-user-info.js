import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const placeHolderAvatarUrl = 'https://lh3.googleusercontent.com/-RI4-jyMIwoI/AAAAAAAAAAI/AAAAAAAAAMA/1Fjxb2ySvbQ/s240-p-rw-no/photo.jpg';

export default ({username, posts, followers, following, classes, onImageClicked, imageFile}) => (
  <Grid container alignItems={"center"}>
    <IconButton onClick={onImageClicked}>
      <Avatar
        className={classes.avatar}
        src={imageFile || placeHolderAvatarUrl}
      />
    </IconButton>
    <Grid item xs>
      <Typography align={"center"} variant='title'>
        {username}
      </Typography>
      <br/>
      <Grid item xs>
        <Grid container className={classes.userNumbers}>
          <Grid item xs={4}>
            <Typography align={"center"} variant={"body2"}>
              Posts<br/>{posts}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align={"center"} variant={"body2"}>
              Followers<br/>{followers}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align={"center"} variant={"body2"}>
              Following<br/>{following}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)