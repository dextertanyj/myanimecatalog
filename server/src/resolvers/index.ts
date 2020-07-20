import { Mutation } from './Mutation';
import { Query } from './Query';
import Reducers from './Reducers';

export default {
  Query,
  Mutation,
  ...Reducers,
};
