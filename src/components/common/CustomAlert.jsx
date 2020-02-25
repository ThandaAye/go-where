import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import AlertAction from '../../redux/action_creators/AlertAction';

const CustomAlert = props => {
  const { message, isSuccess, dismissAlert } = props;
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      key={`gowhere_alert`}
      open={message !== ''}
      onClose={dismissAlert}
    >
      <MuiAlert severity={isSuccess ? 'success' : 'error'}
        onClose={dismissAlert}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

const mapStateToProps = state => ({
  message: state.alert.message,
  isSuccess: state.alert.isSuccess
});

const mapDispatchToProps = {
  dismissAlert: AlertAction.dismissAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert);