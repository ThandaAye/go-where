import React from 'react';
import { makeStyles } from '@material-ui/core';
import CustomAlert from './CustomAlert';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.main.backgroundColor,
    minHeight: 'calc(100vh - 48px)',
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const MainContentContainer = props => {
  const { content } = useStyles();
  return (
    <>
      <main className={content}>
        <CustomAlert />
        {props.children}
      </main>
    </>
  );
};

export default MainContentContainer;