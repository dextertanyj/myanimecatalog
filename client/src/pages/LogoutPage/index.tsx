import { Container, Typography } from '@material-ui/core';
import cookies from 'browser-cookies';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const LogoutPage = () => {
  const history = useHistory();

  useEffect(() => {
    cookies.erase('anime_database_token');
    history.push('/login');
  }, [history]);

  return (
    <Container>
      <Typography>Logging out...</Typography>
    </Container>
  );
};
