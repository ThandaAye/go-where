/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  TextField, makeStyles, Typography, Grid, Button, Divider, Modal, CircularProgress
} from '@material-ui/core';
import { FlightType, DateTimeFormat, Label, AsyncStatus } from '../../constants';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FlightAction } from '../../redux/action_creators';
import { PageHeader, FlightTypeRadioButtons } from '../common';

const styles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  container: {
    backgroundColor: 'white',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    '&:focus': {
      outline: 0
    }
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "rgba(0, 0, 0, 0.15)"
  },
  formNote: {
    fontSize: 12,
    marginBottom: theme.spacing(0),
    color: theme.palette.font.faded,
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
  },
  loadingButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

const AddFlightForm = props => {
  const { DEPARTURE, ARRIVAL, DEPARTURE_REQUIRED, ARRIVAL_REQUIRED, UNSAVED_CHANGES } = Label;
  const { root, container, formNote, divider, buttons, pullToRight, modalBackdrop, loadingButton } = styles();

  const history = useHistory();

  const calculateMinimumArrivalTime = time => moment(time).add(10, 'minutes');

  const minDepartureTime = moment(new Date()).add(12, 'hours');
  const initialDepartureTime = moment(minDepartureTime).add(12, 'hours');

  const minArrivalTime = calculateMinimumArrivalTime(initialDepartureTime);
  const initialArrivalTime = calculateMinimumArrivalTime(minArrivalTime);

  const InitialState = {
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

  const [data, setData] = useState(InitialState.data);
  const [error, setError] = useState(InitialState.error);

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
    setError({ ...InitialState.error });
    const { departure, arrival, flightType } = data;
    const isValid = validateBeforeAdd(departure, arrival, flightType);
    if (isValid) {
      const departureDateTime = data.departureDateTime.unix();
      const arrivalDateTime = data.arrivalDateTime.unix();
      props.addFlight({ departure, arrival, flightType, departureDateTime, arrivalDateTime });
    }
  };

  const validateBeforeAdd = (departure, arrival, flightType) => {
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
    setData({ ...InitialState.data });
    setError({ ...InitialState.error });
  };

  useEffect(() => {
    if (props.addStatus === 'SUCCESS') {
      onReset();
    }
  }, [props.addStatus]);

  return (
    <div className={modalBackdrop}>
      <Modal open className={root}>
        <div className={container}>
          <PageHeader header={Label.ADD_FLIGHT} />
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
            <FlightTypeRadioButtons onFlightTypeChange={onFlightTypeChange} value={data.flightType} />
          </Grid>
          <Divider className={divider} />
          <Button variant="contained" color="primary" size="medium" className={buttons} onClick={onAddFlight} disabled={props.loading}>
            Add Flight {props.loading && <CircularProgress size={24} className={loadingButton} />}
          </Button>
          <Button variant="outlined" color="primary" size="medium" className={buttons} onClick={onBackToListing}>
            Back to Listing
           </Button>
          <Button variant="outlined" color="secondary" size="medium" className={clsx(buttons, pullToRight)} onClick={onReset}>
            Reset All
          </Button>
        </div >
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.flights.addFlightStatus === AsyncStatus.IN_PROGRESS,
  addStatus: state.flights.addFlightStatus
});

const mapDispatchToProps = {
  addFlight: FlightAction.addFlight
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFlightForm);
