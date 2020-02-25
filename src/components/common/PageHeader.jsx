import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    paddingBottom: theme.spacing(2),
  },
  rightComponentStyle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

const PageHeader = props => {
  const { root, header, rightComponentStyle } = styles();
  return (
    <div className={root}>
      <Typography variant="h6" className={clsx(header, props.style)}>
        {props.header}
      </Typography>
      {

        props.rightComponent && (<div className={rightComponentStyle}>{props.rightComponent}</div>)
      }
    </div>
  );
};


export default PageHeader;