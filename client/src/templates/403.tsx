import { Container, Typography } from '@material-ui/core';
import React from 'react';

const Unauthorised = () => {
  return (
    <Container>
      <Typography>
        Sorry, you are not authorized to access this page.
      </Typography>
    </Container>
  );
};

export default Unauthorised;
