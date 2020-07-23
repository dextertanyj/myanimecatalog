import { Episode } from './Episode';
import { Series } from './Series';
import { User } from './User';

export const Query = {
  ...User,
  ...Series,
  ...Episode,
};
