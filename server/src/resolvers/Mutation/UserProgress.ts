import {
  UserProgress as UserProgressType,
  UserProgressCreateArgs,
  UserProgressDeleteArgs,
  UserProgressUpdateArgs,
} from '@prisma/client';
import { Context } from '../../utils';

export const UserProgress = {
  async createUserProgress(
    _parent: unknown,
    args: UserProgressCreateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    const userId = ctx.userId;
    const { data } = args;
    if (userId) {
      return ctx.prisma.userProgress.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } else {
      throw new Error(`Unable to retrieve user information.`);
    }
  },

  async updateUserProgress(
    _parent: unknown,
    args: UserProgressUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    return ctx.prisma.userProgress.update(args);
  },

  async deleteUserProgress(
    _parent: unknown,
    args: UserProgressDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    return ctx.prisma.userProgress.delete(args);
  },
};
