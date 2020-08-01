import cookies from 'browser-cookies';
import { Role } from '../gql/documents';

const tokenName = 'MACLOGINID';

export const setLoginToken = (token: string): void => {
  cookies.set(tokenName, token, {
    expires: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const readAccess = [Role.Admin, Role.Write, Role.Readonly];

export const writeAccess = [Role.Admin, Role.Write];

export const adminAccess = [Role.Admin];
