import React from 'react';
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

const AppToolBar = props => {
  const { menuButton } = useStyles();
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className={menuButton} color="inherit" aria-label="menu" onClick={props.toggleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          TOKIGAMES FLIGHT
          <FlightTakeoffIcon style={{marginLeft: '10px'}} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


export default AppToolBar;