import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import _ from 'lodash';


const chipStyle = (color) => ({
  color:'#fff',
  backgroundColor: color,
  marginRight:10
});

const rootStyle = {
  marginTop: 10,
  minHeight: 40,
};

const getIconChip = (name, color, onChipDelete) => {
  return (
    <Chip
      avatar={
        <Avatar>
          <FaceIcon/>
        </Avatar>
      }
      key={name}
      label={name}
      style={chipStyle(color)}
      onDelete={() => onChipDelete(name)} />
  )
};


const getNormalChip = (name, color,onChipDelete) => {
  return (
    <Chip key={name}
          label={name}
          style={chipStyle(color)}
          onDelete={() => onChipDelete(name)} />
  )
};


const getChips = (characters, onChipDelete) => {
  return _.map(characters, (value, key) => {
    return value.isMain ? getIconChip(key, value.color, onChipDelete)
      : getNormalChip(key, value.color, onChipDelete)
  })
};


const CharacterList = ({ characters, onCharacterDelete }) => {
  return (
    <Grid container style={rootStyle}>
      { getChips(characters, onCharacterDelete) }
    </Grid>
  )
};


export default CharacterList;