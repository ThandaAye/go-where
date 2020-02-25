import { ActionType } from "../../constants";

const FlightAction = {

  fetchFlights: (flightType) => ({
    type: ActionType.FETCH_FLIGHTS,
    payload: {
      flightType
    }
  }),
  onFetchFlightSuccess: data => ({
    type: ActionType.FETCH_FLIGHTS_SUCCESS,
    payload: {
      data
    }
  }),
  onFetchFlightError: error => ({
    type: ActionType.FETCH_FLIGHTS_ERROR,
    payload: {
      error
    }
  }),
  addFlight: (data) => ({
    type: ActionType.ADD_FLIGHT,
    payload: {
      data
    }
  }),
  onAddFlightSuccess: (data) => ({
    type: ActionType.ADD_FLIGHT_SUCCESS,
    payload: {
      data
    }
  })
};

export default FlightAction;