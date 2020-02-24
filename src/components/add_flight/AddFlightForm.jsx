import React, { useState } from 'react';
import { TextField, makeStyles, FormLabel, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Grid, Button, Divider } from '@material-ui/core';
import { FlightType, DateTimeFormat } from '../../constants';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

const styles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  formNote: {
    fontSize: 12,
    marginBottom: theme.spacing(0),
    color: theme.palette.font.faded,
  },
  flightTypeControl: {
    margin: theme.spacing(1),
  },
  flightTypeLegend: {
    fontSize: 12
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  buttons: {
    marginRight: theme.spacing(1)
  },
  pullToRight: {
    float: 'right'
  }
}));

const DEPARTURE = 'departure';
const ARRIVAL = 'arrival';
const UNSAVED_CHANGES = 'You unsaved changes will be lost.r Are you sure you want to go to listing page?';
const DEPARTURE_REQUIRED = 'Please enter departure city';
const ARRIVAL_REQUIRED = 'Please enter arrival city';

const AddFlightForm = props => {
  const { root, flightTypeControl, flightTypeLegend, formNote, divider, buttons, pullToRight } = styles();

  const history = useHistory();

  const calculateMinimumArrivalTime = time => moment(time).add(10, 'minutes');

  const minDepartureTime = moment(new Date()).add(12, 'hours');
  const initialDepartureTime = moment(minDepartureTime).add(12, 'hours');

  const minArrivalTime = calculateMinimumArrivalTime(initialDepartureTime);
  const initialArrivalTime = calculateMinimumArrivalTime(minArrivalTime);

  const initialState = {
    data: {
      isEdited: false,
      departure: '',
      arrival: '',
      departureDateTime: initialDepartureTime,
      arrivalDateTime: initialArrivalTime,
      flightType: FlightType.CHEAP
    },
    error: {
      departure: '',
      arrival: '',
      departureDateTime: '',
      arrivalDateTime: ''
    }
  };

  const [data, setData] = useState(initialState.data);
  const [error, setError] = useState(initialState.error);

  const setDataChanges = (data) => setData({ ...data, isEdited: true });

  const onDepartureOrArrivalChange = (e, type) => {
    data[type] = e.target.value;
    setDataChanges({ ...data });
  };

  const onFlightTypeChange = (event) => {
    data.flightType = event.target.value;
    setDataChanges({ ...data });
  };

  const onDateTimePickerChange = (date, value, travelType) => {
    if (travelType === DEPARTURE) {
      data.departureDateTime = date;
      if (date.isValid()) {
        data.arrivalDateTime = calculateMinimumArrivalTime(date);
      }
    } else {
      data.arrivalDateTime = date;
    }

    setDataChanges(data);
  };

  const onAddFlight = () => {
    const isValid = validateBeforeAdd();
    if (isValid) {
      const { departure, arrival, departureDateTime, arrivalDateTime } = data;
      props.addFlight({ departure, arrival, departureDateTime, arrivalDateTime });
    }
  };

  const validateBeforeAdd = () => {
    const { departure, arrival, flightType } = data;
    if (departure && arrival && !error.departureDateTime && !error.arrivalDateTime && flightType) {
      return true;
    }
    if (!departure) {
      error.departure = DEPARTURE_REQUIRED;
    }
    if (!arrival) {
      error.arrival = ARRIVAL_REQUIRED;
    }

    setError({ ...error });
    return false;
  };

  const setDateTimePickerError = (val, type) => {
    if (type === DEPARTURE) {
      error.departureDateTime = val;
    } else {
      error.arrivalDateTime = val;
    }
    setError(error);
  };

  const onBackToListing = () => {
    if (data.isEdited) {
      const isOk = window.confirm(UNSAVED_CHANGES);
      if (!isOk) {
        return;
      }
    }
    history.push('/');
  };

  const onReset = () => {
    const data = { ...initialState.data };
    setData({ ...data });
    error.isEdited = false;
    setError({ ...initialState.error });
  };

  return (
    <div className={root}>
      <Typography variant="body2" className={formNote}>
        Note: All fields are required to fill in
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            autoFocus
            id="addflight-form-departure"
            label="Departure"
            placeholder="E.g. Singapore"
            style={{ marginTop: 8 }}
            helperText={error.departure}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={data.departure}
            onChange={e => onDepartureOrArrivalChange(e, DEPARTURE)}
            error={error.departure !== ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <KeyboardDateTimePicker
            variant="standard"
            ampm={true}
            label="Departure Time"
            style={{ marginTop: 8, minWidth: '100%' }}
            value={data.departureDateTime}
            minDate={minDepartureTime}
            strictCompareDates={true}
            onChange={(data, value) => onDateTimePickerChange(data, value, DEPARTURE)}
            onError={(val, date) => setDateTimePickerError(val, DEPARTURE)}
            disablePast
            format={DateTimeFormat.display}
            minDateMessage={'Departure time should be at least 5 hours later from now'}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="addflight-form-arrival"
            label="Arrival"
            placeholder="E.g. Japan"
            style={{ marginTop: 8 }}
            helperText={error.arrival}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={data.arrival}
            onChange={e => onDepartureOrArrivalChange(e, ARRIVAL)}
            error={error.arrival !== ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <KeyboardDateTimePicker
            variant="standard"
            ampm={true}
            label="Arrival Time"
            style={{ marginTop: 8, minWidth: '100%' }}
            minDate={minArrivalTime}
            value={data.arrivalDateTime}
            onChange={(data, value) => onDateTimePickerChange(data, value, ARRIVAL)}
            strictCompareDates={true}
            onError={(val, date) => setDateTimePickerError(val, ARRIVAL)}
            disablePast
            format={DateTimeFormat.display}
            minDateMessage={'Arrival time should be after departure time'}
          />
        </Grid>
        <FormControl component="fieldset" className={flightTypeControl}>
          <FormLabel component="legend" className={flightTypeLegend}>Flight Type</FormLabel>
          <RadioGroup aria-label="flighType" name="flightType" value={data.flightType} row onChange={onFlightTypeChange}>
            <FormControlLabel value={FlightType.CHEAP} control={<Radio color="primary" />} label="Budget" />
            <FormControlLabel value={FlightType.BUSINESS} control={<Radio color="primary" />} label="Business" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Divider className={divider} />
      <Button variant="contained" color="primary" size="medium" className={buttons} onClick={onAddFlight}>
        Add Flight
      </Button>
      <Button variant="outlined" color="primary" size="medium" className={buttons} onClick={onBackToListing}>
        Back to Listing
      </Button>
      <Button variant="outlined" color="secondary" size="medium" className={clsx(buttons, pullToRight)} onClick={onReset}>
        Reset All
      </Button>
    </div >
  );
};

export default AddFlightForm;