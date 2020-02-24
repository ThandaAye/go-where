import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, useLocation, useHistory } from 'react-router-dom';
import { RouteConfig } from '../../constants/Config';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
}));

const CustomDrawer = props => {
  const location = useLocation();
  const history = useHistory();
  const { drawer, drawerPaper, toolbar } = useStyles();
  return (
    <Drawer open={props.isDrawerOpen}
      className={drawer}
      classes={{
        paper: drawerPaper,
      }}
      onClose={props.closeDrawer}
    >
      <div className={toolbar} />
      <List>
        <BrowserRouter>
          {
            RouteConfig.map((route) => (
              <ListItem button key={route.key} onClick={() => {
                history.push(route.path);
                props.closeDrawer();
              }} selected={location.pathname === route.path}
              >
                {
                  route.icon && (
                    <ListItemIcon>
                      {route.icon()}
                    </ListItemIcon>
                  )
                }
                <ListItemText primary={route.text} />
              </ListItem>
            ))
          }
        </BrowserRouter>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;;;;;