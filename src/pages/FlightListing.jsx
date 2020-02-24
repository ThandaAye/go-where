import React from 'react';
import { Paper } from '@material-ui/core';
import { FlightListingTable } from '../components/flight_listing';
import { connect } from 'react-redux';
import { FlightAction } from '../redux/action_creators';
import { FlightType } from '../constants';

class FlightListing extends React.Component {

  state = {
    loading: true
  };

  componentDidMount() {
    // Currently, just fetch all flights
    this.props.fetchFlights(FlightType.ALL);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.flights) !== JSON.stringify(this.props.flights)) {
      this.setState({ loading: false });
      console.log('A: ', this.props.flights);
    }
  }

  render() {
    return (
      <>
        <Paper>
          <FlightListingTable data={this.props.flights} />
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  flights: state.flights.data,
  flightError: state.flights.error
});

const mapDispatchToProps = {
  fetchFlights: FlightAction.fetchFlights
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightListing);