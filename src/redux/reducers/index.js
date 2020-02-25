import { combineReducers } from 'redux';
import FlighReducer from './FlightReducer';
import AlertReducer from './AlertReducer';

const appReducers = combineReducers({
  flights: FlighReducer,
  alert: AlertReducer
});

export { FlighReducer, AlertReducer };
export default appReducers;