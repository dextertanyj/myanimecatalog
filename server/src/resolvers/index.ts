import { Mutation } from './Mutation';
import { Query } from './Query';
import Reducers from './Reducers';
import Scalars from './Scalars';

export default {
  Query,
  Mutation,
  ...Reducers,
  ...Scalars,
};
