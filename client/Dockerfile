FROM node:alpine as build

WORKDIR /app

RUN apk --update --no-cache add yarn

COPY . ./

RUN yarn

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]