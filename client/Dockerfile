FROM node:alpine as build

RUN apk --update --no-cache add yarn bash

COPY . ./

RUN yarn

RUN yarn build

FROM nginx:alpine

COPY --from=build ./build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]