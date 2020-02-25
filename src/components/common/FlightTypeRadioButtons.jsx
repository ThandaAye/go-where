import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import { FlightType } from '../../constants';


const styles = makeStyles(theme => ({
  flightTypeControl: {
    margin: theme.spacing(1),
  },
  flightTypeLegend: {
    fontSize: 12
  }
}));

const FlightTypeRadioButtons = props => {
  const { flightTypeControl, flightTypeLegend } = styles();
  const { onFlightTypeChange, value, showFlightTypeAll } = props;

  return (
    <FormControl component="fieldset" className={flightTypeControl}>
      <FormLabel component="legend" className={flightTypeLegend}>Flight Type</FormLabel>
      <RadioGroup aria-label="flighType" name="flightType" value={value} row onChange={onFlightTypeChange}>
        {
          showFlightTypeAll && (
            <FormControlLabel value={FlightType.ALL} control={<Radio color="primary" />} label={FlightType.ALL} />
          )
        }
        <FormControlLabel value={FlightType.CHEAP} control={<Radio color="primary" />} label={FlightType.CHEAP} />
        <FormControlLabel value={FlightType.BUSINESS} control={<Radio color="primary" />} label={FlightType.BUSINESS} />
      </RadioGroup>
    </FormControl>
  );
};

export default FlightTypeRadioButtons;