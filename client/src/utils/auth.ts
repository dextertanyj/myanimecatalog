import cookies from "browser-cookies";

const tokenName = "anime_database_token";

export const setLoginToken = (token: string): void => {
  cookies.set(tokenName, token, {
    expires: 30 * 24 * 60 * 60,
    path: "/",
  });
};
