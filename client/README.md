# MyAnimeManager Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contents

- [Deployment Guide](#deployment-guide)
- [Avaliable Scripts](#available-scripts)
- More coming soon...

## Deployment Guide

1. Install docker and docker-compose.
2. Obtain SSL certificates for client domain from let's encrypt.
3. Clone the repository. The rest of the guide assumes the `/client` folder as the root directory.
4. Copy the `/etc/letsencrypt/archive` and `/etc/letsencrypt/renewal` folders to `./nginx/certbot/conf/archive` and `./nginx/certbot/conf/renewal` respectively.
5. Create a folder `./client/nginx/certbox/conf/live/your-domain-here`.
6. For each file in the `/archive/your-domain-here` folder, create a symlink to a corresponding file in the `/live/your-domain-here` folder.
   - For example, `/live/your-domain-here/cert.pem` is linked to `/archive/your-domain-here/cert1.pem`.
7. Create a copy of `./nginx/conf.d/nginx.conf.example` in the same folder and rename it `nginx.conf`.
8. Replace all instances of `example.com` with your client domain name in `nginx.conf`.
9. Create a copy of `./example.env` in the root folder and rename it as `./env`.
10. Fill in the details in the `.env` file.
11. Run `docker-compose up --build`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
