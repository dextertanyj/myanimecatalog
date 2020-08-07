import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Role } from '../gql/documents';
import { useLoggedInQuery } from '../gql/queries';
import Unauthorised from '../templates/403';

export const withAuth = (roles?: Role[]) => (Component: any) => (
  props?: any
) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const [authorised, setAuthorised] = useState<boolean | undefined>(undefined);
  const { data, loading } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.loggedIn?.id && !loading) {
      setLoggedIn(true);
    } else if (!loading) {
      setLoggedIn(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (loggedIn && roles) {
      setAuthorised(
        !!data?.loggedIn?.role && roles.includes(data?.loggedIn?.role)
      );
    } else if (loggedIn) {
      setAuthorised(true);
    } else if (loggedIn === false) {
      setAuthorised(false);
    }
  }, [data, loggedIn]);

  if (loading || authorised === undefined) {
    return <></>;
  }

  if (loggedIn && authorised) {
    return <Component {...props} {...data} />;
  } else if (loggedIn === false && authorised === false) {
    return <Redirect to={'/login'} />;
  } else {
    return <Unauthorised />;
  }
};
