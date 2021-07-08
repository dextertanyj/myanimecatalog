import { ApolloProvider } from '@apollo/client';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/core';
import { blueGrey, teal } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import cookies from 'browser-cookies';
import 'fontsource-roboto';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { defaults } from 'react-chartjs-2';
import initApollo from './Apollo';
import ReactRouter from './router';

defaults.font.family = 'Roboto';

const theme = createTheme({
  palette: {
    primary: {
      light: teal[200],
      main: teal[400],
      dark: teal[600],
    },
    text: {
      primary: blueGrey[900],
    },
  },
  typography: {
    fontWeightMedium: 400,
  },
});

const apolloClient = initApollo(
  {},
  {
    getToken: () => {
      return cookies.get('MACLOGINID') ?? '';
    },
  }
);

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={1000}
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ReactRouter />
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>
);
