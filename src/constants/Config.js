import React from 'react';
import { FlightListing, AddFlight } from '../pages';
import ListingIcon from '@material-ui/icons/List';
import AddItemIcon from '@material-ui/icons/Add';

const RouteConfig = [
  {
    key: 'flighListing',
    text: 'Flight Search',
    icon: () => (<ListingIcon />),
    path: '/',
    exact: true,
    component: FlightListing
  },
  {
    key: 'addFlight',
    text: 'Add Flight',
    icon: () => (<AddItemIcon />),
    path: '/add',
    exact: false,
    component: AddFlight
  }
];

export { RouteConfig };