import { takeLeading, put, delay } from 'redux-saga/effects';
import { ActionType, FlightType, Label } from '../../constants';
import { FlightAction } from '../action_creators';
import axios from 'axios';
import AlertAction from '../action_creators/AlertAction';
import { splitString } from '../../utils';

const cheap = {"data":[{"route":"Cruz del Eje-Antalya","departure":1558902656.000000000,"arrival":1558902656.000000000},{"route":"Cruz del Eje-Tizi","departure":1558902656.000000000,"arrival":1558902656.000000000},{"route":"Greece-Tizi","departure":1558902656.000000000,"arrival":1558902656.000000000},{"route":"Paris-Tizi","departure":1558902656.000000000,"arrival":1558902656.000000000},{"route":"Antalya-Istabul","departure":1558935605.000000000,"arrival":1558935605.000000000},{"route":"Antalya-Venedik","departure":1572169220.000000000,"arrival":1572169220.000000000},{"route":"Amasra-Greece","departure":1566423630.000000000,"arrival":1566423630.000000000}]}

const business = {"data":[{"departure":"Ankara","arrival":"Antalya","departureTime":1561627856.000000000,"arrivalTime":1564410656.000000000},{"departure":"Cruz del Eje","arrival":"Tizi","departureTime":1558902656.000000000,"arrivalTime":1558902656.000000000},{"departure":"Antalya","arrival":"Istanbul","departureTime":1563588000.000000000,"arrivalTime":1563678000.000000000},{"departure":"Tizi","arrival":"Cruz del Eje","departureTime":1558902656.000000000,"arrivalTime":1558902656.000000000},{"departure":"Istanbul","arrival":"Antalya","departureTime":1563588000.000000000,"arrivalTime;":1563678000.000000000},{"departure":"Istanbul","arrival":"Antalya","departureTime":1558902656.000000000,"arrivalTime":1558902656.000000000},{"departure":"Istanbul","arrival":"Antalya","departureTime":1558902656.000000000,"arrivalTime":1558902656.000000000},{"departure":"Singapore","arrival":"Istanbul","departureTime":1563588000.000000000,"arrivalTime":1563678000.000000000},{"departure":"Singapore","arrival":"Istanbul","departureTime":1558907735.000000000,"arrivalTime":1558907735.000000000},{"departure":"Istanbul","arrival":"Singapore","departureTime":1558907746.000000000,"arrivalTime":1558907746.000000000},{"departure":"Paris","arrival":"Singapore","departureTime":1558907757.000000000,"arrivalTime":1558907757.000000000},{"departure":"Greece","arrival":"Singapore","departureTime":1558907761.000000000,"arrivalTime":1558907761.000000000},{"departure":"Antalya","arrival":"Singapore","departureTime":1558907764.000000000,"arrivalTime":1558907764.000000000},{"departure":"Malmö","arrival":"Singapore","departureTime":1563588000.000000000,"arrivalTime":1563678000.000000000},{"departure":"Frankfurt","arrival":"Singapore","departureTime":1563588000.000000000,"arrivalTime":1563678000.000000000},{"departure":"Berlin","arrival":"Singapore","departureTime":1563588000.000000000,"arrivalTime":1563678000.000000000}]};

export function* fetchFlights(action) {
  try {
    // call api
    // const response = yield axios.all([fetchCheapFlights(), fetchBusinessFlights()]);
    const cheapFlights = yield fetchCheapFlights();
    const businessFlights = yield fetchBusinessFlights();
    const processedCheapFlights = processCheapFlightsData(cheapFlights.data.data);
    const processedBusinessFlights = processBusinessFlightsData(businessFlights.data.data);
    yield put(FlightAction.onFetchFlightSuccess([...processedCheapFlights, ...processedBusinessFlights]));
  } catch (err) {
    console.log(err);
    yield put(FlightAction.onFetchFlightError(Label.GENERIC_ERROR));
    yield put(AlertAction.showAlert(Label.GENERIC_ERROR, false));
  }
}
//change here merge

const headers = {
//   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
// 'Access-Control-Allow-Headers':'content-Type, x-id-token, Origin',
//   'Access-Control-Allow-Origin': '*',
  'content-Type': 'application/json',
  'x-id-token': 'eyJraWQiOiJJd3VwdmlsK1c5TWZudmR3aGdWem1BVkdcL0Q0dDZEaCs5Wit5QnN2aExSZz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoib1NYWHFDeVpXUldqcWY4dG1xWFdiQSIsInN1YiI6IjA4ODhmNjZjLTY1OWUtNDVjZi1hMjQ5LTdkMzlhMGMwOTdiNiIsImN1c3RvbTpyb2xlcyI6IkFETUlOIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpvcmdhbmlzYXRpb24iOiJUUklOSVRZIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1VKYW5WODhRViIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJ0cmFjeTIiLCJhdWQiOiI1czIzYXU5bnJtbmhuaTc3a2E5a2Rkb3JldCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg5OTY4NTc5LCJleHAiOjE1ODk5NzIxNzksImlhdCI6MTU4OTk2ODU3OSwiZW1haWwiOiJ0cmFjeS5heWVAc3RhY3MuaW8ifQ.MRwmyOUv_i-JAZbA2mxwzfU2YB5GDl45lZ2IQbJfmWH1Q_2G7LMT-GD-YldfadCkh0MrKyrN-EXEjrNpI2K4DMIL8FtuLs4o2DOOobAPxuJiVhIM41UIVjlRAqjLs55QyFyq0Eptfo8DnKRZCfwRf1_7PgWdZZQKeDARXPzXwasRbJ3RY20Kr7YavF94SEuideygdbcd2J7T-ab7kW4_CvtoXbmjIxzXqWZTZlXIAucMrTiYRVxmVcV3IXnl49R9AIXEaDIy-4QltI3Ux_QpY3VbNq9D1_QGZ_5UkAmlS1OUwmIoPyR2iQso1s-4gvya51WqHd9pb0eEqGf8FTmzDg'
}

function fetchCheapFlights() {
  return axios.post('http://localhost:8080/trinity/org/create', {headers: headers});
}

function fetchBusinessFlights() {
  return axios.get('https://tokigames-challenge.herokuapp.com/api/flights/business');
}

function processCheapFlightsData(data) {
  return data.map(flight => ({
    departure: splitString(flight.route, '-')[0],
    arrival: splitString(flight.route, '-')[1],
    flightType: FlightType.CHEAP,
    departureDateTime: flight.departure,
    arrivalDateTime: flight.arrival
  }));
}

function processBusinessFlightsData(data) {
  return data.map(flight => ({
    departure: flight.departure,
    arrival: flight.arrival,
    flightType: FlightType.BUSINESS,
    departureDateTime: flight.departureTime,
    arrivalDateTime: flight.arrivalTime
  }));
}

// to replicate async request
export function* addFlight(action) {
  yield delay(1000);
  yield put(FlightAction.onAddFlightSuccess(action.payload.data));
  yield put(AlertAction.showAlert(Label.ADD_FLIGHT_SUCCESS, true));
}

export default function* watchFlightSaga() {
  yield takeLeading(ActionType.FETCH_FLIGHTS, fetchFlights);
  yield takeLeading(ActionType.ADD_FLIGHT, addFlight);
}