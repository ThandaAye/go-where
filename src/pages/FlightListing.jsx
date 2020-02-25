import React from 'react';
import { Paper, makeStyles, Button } from '@material-ui/core';
import { FlightListingTable } from '../components/flight_listing';
import { Link, useLocation } from 'react-router-dom';
import { PageHeader } from '../components/common';
import { Label } from '../constants';


const styles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  pageHeader: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  }
}));

const FlightListing = props => {
  const location = useLocation();
  const { root, pageHeader } = styles();

  return (
    <>
      <Paper className={root}>
        <PageHeader header={'Browse Flights'} style={pageHeader} rightComponent={
          <Button variant={'outlined'} color={'primary'}
            component={Link}
            to={{
              pathname: '/flight/add',
              state: { background: location }
            }}>
            {Label.ADD_FLIGHT}
          </Button>
        } />
        <FlightListingTable />
      </Paper>
    </>
  );
};

export default FlightListing;