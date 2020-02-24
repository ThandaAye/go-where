import { ActionType } from "../../constants";

const initialState = {
  data: [],
  error: null
};

// Even though we only have 2 properties under the state, we will state use the spread operator below for future proof
const FlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_FLIGHTS:
      return {
        ...state,
        error: null
      };
    case ActionType.FETCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null
      };
    case ActionType.FETCH_FLIGHTS_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    case ActionType.ADD_FLIGHT:
      const data = [...state.data, action.payload.data];
      return {
        ...state,
        data,
        error: null
      };
    default:
      return state;
  }
};

export default FlightReducer;