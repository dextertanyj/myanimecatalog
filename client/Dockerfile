FROM node:alpine as build

RUN apk --update --no-cache add yarn bash

COPY . ./

RUN yarn

RUN yarn build

FROM nginx:alpine

COPY --from=build ./build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]