
import { all } from 'redux-saga/effects';
import FlightSaga from './FlightSaga';

export default function* appSaga() {
  yield all([
    FlightSaga()
  ]);
}