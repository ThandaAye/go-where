import { ActionType } from "../../constants";

const InitialState = {
  message: '',
  isSuccess: true
};

const AlertReducer = (state = InitialState, action) => {

  switch (action.type) {
    case ActionType.SHOW_ALERT:
      const { message, isSuccess } = action.payload;
      return {
        message,
        isSuccess
      };
    case ActionType.DISMISS_ALERT:
      return {
        ...InitialState
      };
    default:
      return {
        ...state
      };
  }
};

export default AlertReducer;