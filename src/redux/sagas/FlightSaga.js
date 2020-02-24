import { takeLeading, put } from 'redux-saga/effects';
import { ActionType } from '../../constants';
import { FlightAction } from '../action_creators';


const data = [{
  "departure": "Ankara", "arrival": "Antalya", "departureDateTime": 1561627856.000000000,
  "arrivalDateTime": 1564410656.000000000
}, {
  "departure": "Cruz del Eje", "arrival": "Tizi", "departureDateTime": 1558902656.000000000, "arrivalDateTime":
    1558902656.000000000
}, {
  "departure": "Antalya", "arrival": "Istanbul", "departureDateTime": 1563588000.000000000,
  "arrivalDateTime": 1563678000.000000000
}, {
  "departure": "Tizi", "arrival": "Cruz del Eje", "departureDateTime": 1558902656.000000000,
  "arrivalDateTime": 1558902656.000000000
}, {
  "departure": "Istanbul", "arrival": "Antalya", "departureDateTime": 1563588000.000000000,
  "arrivalDateTime": 1563678000.000000000
}, {
  "departure": "Istanbul", "arrival": "Antalya", "departureDateTime": 1558902656.000000000,
  "arrivalDateTime": 1558902656.000000000
}, {
  "departure": "Istanbul", "arrival": "Antalya", "departureDateTime": 1558902656.000000000,
  "arrivalDateTime": 1558902656.000000000
}, {
  "departure": "Singapore", "arrival": "Istanbul", "departureDateTime": 1563588000.000000000,
  "arrivalDateTime": 1563678000.000000000
}];


export function* fetchFlights(action) {
  try {
    // call api
    yield put(FlightAction.onFetchFlightSuccess(data));
  } catch (err) {
    console.log(err);
    // Will just display the generic error message for now
    const errorMsg = 'Oops! Something went wrong!';
    yield put(FlightAction.onFetchFlightError(errorMsg));
  }
}

export default function* watchFlightSaga() {
  yield takeLeading(ActionType.FETCH_FLIGHTS, fetchFlights);
}