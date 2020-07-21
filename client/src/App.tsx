import { ApolloProvider } from '@apollo/react-hoc';
import MomentUtils from '@date-io/moment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import cookies from 'browser-cookies';
import React from 'react';
import initApollo from './Apollo';
import ReactRouter from './Router';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[400],
    },
  },
  typography: {
    fontWeightMedium: 400,
    subtitle2: {
      fontWeight: 'bold',
    },
  },
});

const apolloClient = initApollo(
  {},
  {
    getToken: () => {
      return cookies.get('anime_database_token') ?? '';
    },
  }
);

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ReactRouter />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </ApolloProvider>
);
