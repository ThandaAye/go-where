import React, { useState } from 'react';
// import logo from './logo.svg';
import { AppToolBar, Drawer, MainContentContainer } from './components/common';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RouteConfig } from './constants/Config';

const darkTheme = createMuiTheme({
  palette: {
    main: {
      backgroundColor: '#fff'
    }
  },
});

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <div className="App">
          <BrowserRouter>
            <AppToolBar toggleDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)} />
            <Drawer isDrawerOpen={isDrawerOpen} closeDrawer={() => setIsDrawerOpen(false)} />
            <MainContentContainer>
              <Switch>
                {RouteConfig.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={props => (
                      <route.component {...props} routes={route.routes} />
                    )} />
                ))}
              </Switch>
            </MainContentContainer>
          </BrowserRouter>

        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
