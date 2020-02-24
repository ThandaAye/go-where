import React, { Component } from 'react';
import { FlightAction } from '../redux/action_creators';
import { Paper, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { PageHeader } from '../components/common';
import { AddFlightForm } from '../components/add_flight';

class AddFlight extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Paper className="gowhere-addflight-form-container">
          <PageHeader header={'Add Flight'} />
          <AddFlightForm addFlight={this.props.addFlight} />
        </Paper>
      </Container >
    );
  }
}

const mapDispatchToProps = {
  addFlight: FlightAction.addFlight
};

export default connect(null, mapDispatchToProps)(AddFlight);;;