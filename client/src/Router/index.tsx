import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import AnimeListPage from '../pages/AnimeListPage';
import CatalogPage from '../pages/CatalogPage';
import EpisodePage from '../pages/EpisodePage';
import HomePage from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import ProfilePage from '../pages/ProfilePage';
import SearchPage from '../pages/SearchPage';
import SeriesPage from '../pages/SeriesPage';
import { SetupPage } from '../pages/SetupPage';
import ToolsPage from '../pages/ToolsPage';
import UsersPage from '../pages/UsersPage';

export default function ReactRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact strict path="/login">
            <LoginPage />
          </Route>
          <Route exact strict path="/setup">
            <SetupPage />
          </Route>
          <Navigation>
            <Route exact strict path="/logout">
              <LogoutPage />
            </Route>
            <Route exact strict path="/">
              <HomePage />
            </Route>
            <Route exact strict path="/profile">
              <ProfilePage />
            </Route>
            <Route exact strict path="/catalog">
              <CatalogPage />
            </Route>
            <Route exact strict path="/list">
              <AnimeListPage />
            </Route>
            <Route
              exact
              strict
              path="/episode/:episodeId"
              render={(props) => (
                <EpisodePage key={props.match.params.episodeId} />
              )}
            />
            <Route
              exact
              strict
              path="/series/:seriesId"
              render={(props) => (
                <SeriesPage key={props.match.params.seriesId} />
              )}
            />
            <Route exact strict path="/users">
              <UsersPage />
            </Route>
            <Route exact strict path="/tools">
              <ToolsPage />
            </Route>
            <Route exact strict path="/search" component={SearchPage} />
          </Navigation>
        </Switch>
      </div>
    </Router>
  );
}
