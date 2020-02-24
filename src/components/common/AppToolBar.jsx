import React from 'react';
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
          GoWhere
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


export default AppToolBar;