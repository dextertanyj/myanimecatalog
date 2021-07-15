FROM keymetrics/pm2:15-alpine	AS build

WORKDIR /app

RUN yarn global add @vercel/ncc
RUN yarn global add prisma
COPY . ./

RUN yarn install --silent 
RUN yarn prisma generate

RUN ncc build src/index.ts && cp src/schema.graphql dist/schema.graphql && cp prisma/schema.prisma dist/schema.prisma

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 4000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]