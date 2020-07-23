import { Auth } from './Auth';
import { Series } from './Series';
import { User } from './User';

export const Mutation = {
  ...Auth,
  ...User,
  ...Series,
};
