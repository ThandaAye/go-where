import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";
import { FlightTypeRadioButtons } from '../common';

const styles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  wrapper: {
    border: '1px solid rgb(205, 205, 205)',
    borderRadius: 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  filterStyle: {
    display: 'inline-flex',
    position: 'relative',
    top: '-10px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: 'white',
    color: 'gray'
  }
}));
const FilterHeader = props => {
  const { filter, setFlightTypeFilter } = props;
  const { root, wrapper, filterStyle } = styles();
  return (
    <div className={root}>
      <div className={wrapper}>
        <Typography variant={'body2'} className={filterStyle}>
          Filter
      </Typography>
        <div>
          <FlightTypeRadioButtons showFlightTypeAll={true} value={filter.flightType} onFlightTypeChange={setFlightTypeFilter} />
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;