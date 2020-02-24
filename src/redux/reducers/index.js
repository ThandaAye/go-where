import { combineReducers } from 'redux';
import FlighReducer from './FlightReducer';

const appReducers = combineReducers({
  flights: FlighReducer
});

export { FlighReducer };
export default appReducers;