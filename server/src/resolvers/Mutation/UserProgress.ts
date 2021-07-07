import { Prisma, UserProgress as UserProgressType } from '@prisma/client';
import { Context } from '../../utils';

export const UserProgress = {
  async createUserProgress(
    _parent: unknown,
    args: { data: Prisma.UserProgressCreateInput },
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    const { data } = args;
    if (ctx.userId) {
      return ctx.prisma.userProgress.create({
        data: {
          ...data,
          user: {
            connect: {
              id: ctx.userId,
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
    args: Prisma.UserProgressUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    return ctx.prisma.userProgress.update(args);
  },

  async updateMyProgress(
    _parent: unknown,
    args: {
      where: Prisma.SeriesWhereUniqueInput;
      data: Prisma.UserProgressUpdateInput;
    },
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
    args: Prisma.UserProgressDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType> {
    return ctx.prisma.userProgress.delete(args);
  },
};
