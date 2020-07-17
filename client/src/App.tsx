import { ApolloProvider } from "@apollo/react-hoc";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import cookies from "browser-cookies";
import React from "react";
import initApollo from "./Apollo";
import ReactRouter from "./Router";

const apolloClient = initApollo(
  {},
  {
    getToken: () => {
      return cookies.get("anime_database_token") ?? "";
    },
  }
);

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ReactRouter />
    </MuiPickersUtilsProvider>
  </ApolloProvider>
);
