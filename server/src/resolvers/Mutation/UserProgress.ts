import {
  SeriesWhereUniqueInput,
  UserProgress as UserProgressType,
  UserProgressCreateArgs,
  UserProgressDeleteArgs,
  UserProgressUpdateArgs,
  UserProgressUpdateInput,
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

  async updateMyProgress(
    _parent: unknown,
    args: { where: SeriesWhereUniqueInput; data: UserProgressUpdateInput },
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    if (ctx.userId && args.where.id) {
      return ctx.prisma.userProgress.update({
        where: {
          seriesId_userId: {
            seriesId: args.where.id,
            userId: ctx.userId,
          },
        },
        data: args.data,
      });
    } else {
      throw new Error(`Something went wrong. Please try again.`);
    }
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
