import { ActionType } from "../../constants";

const AlertAction = {
  showAlert: (message, isSuccess) => ({
    type: ActionType.SHOW_ALERT,
    payload: {
      message,
      isSuccess
    }
  }),

  dismissAlert: () => ({
    type: ActionType.DISMISS_ALERT
  })
};

export default AlertAction;