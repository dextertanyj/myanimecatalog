import { Auth } from "./Auth";
import { User } from "./User";

export const Mutation = {
  ...Auth,
  ...User,
};
