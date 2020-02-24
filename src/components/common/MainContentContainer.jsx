import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.main.backgroundColor,
    minHeight: '100vh',
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const MainContentContainer = props => {
  const { content } = useStyles();
  return (
    <>
      <main className={content}>
        {props.children}
      </main>
    </>
  );
};

export default MainContentContainer;;