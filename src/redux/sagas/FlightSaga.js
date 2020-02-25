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

function fetchCheapFlights() {
  return axios.get('https://tokigames-challenge.herokuapp.com/api/flights/cheap');
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