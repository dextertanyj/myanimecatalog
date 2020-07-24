import { Auth } from './Auth';
import { Episode } from './Episode';
import { Series } from './Series';
import { User } from './User';

export const Mutation = {
  ...Auth,
  ...User,
  ...Series,
  ...Episode,
};
