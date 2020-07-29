FROM keymetrics/pm2:latest-alpine	AS build

WORKDIR /app

RUN yarn global add @zeit/ncc
RUN yarn global add @prisma/cli
COPY . /app

# installing from yarn before generating
RUN yarn install --silent 
RUN prisma generate

RUN ncc build src/index.ts && cp src/schema.graphql dist/schema.graphql && cp prisma/schema.prisma dist/schema.prisma

ENV PATH /app/node_modules/.bin:$PATH

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--node-args=\"--max_old_space_size=4096\""]