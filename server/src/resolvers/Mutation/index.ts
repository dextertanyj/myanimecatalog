import { Auth } from './Auth';
import { Episode } from './Episode';
import { File } from './File';
import { Series } from './Series';
import { User } from './User';

export const Mutation = {
  ...Auth,
  ...Episode,
  ...File,
  ...Series,
  ...User,
};
