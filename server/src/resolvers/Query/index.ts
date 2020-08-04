import { Dashboard } from './Dashboard';
import { Episode } from './Episode';
import { File } from './File';
import { Reference } from './Reference';
import { Search } from './Search';
import { Series } from './Series';
import { User } from './User';
import { UserProgress } from './UserProgress';

export const Query = {
  ...Dashboard,
  ...Episode,
  ...File,
  ...Series,
  ...User,
  ...UserProgress,
  ...Search,
  ...Reference,
};
