import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

const AppToolBar = props => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6">
          GoWhere
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


export default AppToolBar;