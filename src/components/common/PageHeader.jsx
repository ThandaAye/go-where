import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const styles = makeStyles(theme => ({
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: 'left'
  }
}));

const PageHeader = props => {
  const { header } = styles();
  return (
    <Typography variant="h6" className={header}>
      {props.header}
    </Typography>
  );
};


export default PageHeader;