import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import path from 'path';
import resolvers from './resolvers';
import { permissions } from './shield';
import { getContextUserId } from './utils';

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const schema = loadSchemaSync(path.join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(schemaWithResolvers, permissions);

export const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }: { req: express.Request }) => ({
    ...req,
    prisma,
    userId: getContextUserId(req),
  }),
  playground: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  cors: {
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, apollographql-client-version, batch, apollographql-client-name, authorization',
  },
});

server
  .listen()
  .then(({ url }: { url: string }) =>
    console.log(`Server is running on ${url}`)
  );
