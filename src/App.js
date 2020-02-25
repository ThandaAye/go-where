import React from 'react';
import { AppToolBar, MainContentContainer } from './components/common';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FlightListing } from './pages';

import MomentUtils from '@date-io/moment';
import { AddFlightFormModal } from './components/add_flight';

const darkTheme = createMuiTheme({
  palette: {
    main: {
      backgroundColor: '#fff'
    },
    font: {
      faded: '#5a5a5a'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <div className="App">
          <MuiPickersUtilsProvider utils={MomentUtils} locale={'en'}>
            <BrowserRouter>
              <AppToolBar />
              <MainContentContainer>
                <RouteComponent />
              </MainContentContainer>
            </BrowserRouter>
          </MuiPickersUtilsProvider>
        </div>
      </CssBaseline>
    </ThemeProvider >
  );
}

function RouteComponent() {
  let location = useLocation();

  let background = location.state && location.state.background;
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<FlightListing />} />
      </Switch>

      {background && <Route path="/flight/add" children={<AddFlightFormModal />} />}

      <Redirect to="/" />
    </div>
  );
}

export default App;
