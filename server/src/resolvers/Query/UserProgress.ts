import {
  FindOneSeriesArgs,
  UserProgress as UserProgressType,
} from '@prisma/client';
import { Context } from '../../utils';

export const UserProgress = {
  async mySeriesProgress(
    _parent: unknown,
    args: FindOneSeriesArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType | null> {
    if (args.where.id && ctx.userId) {
      const data = await ctx.prisma.userProgress.findOne({
        where: {
          seriesId_userId: {
            seriesId: args.where.id,
            userId: ctx.userId,
          },
        },
      });
      return data;
    } else if (args.where.id) {
      throw new Error(`Unable to retrieve user information.`);
    } else {
      throw new Error(`Unable to retrieve series information.`);
    }
  },

  async myProgress(
    _parent: unknown,
    _args: unknown,
    ctx: Context,
    _info: unknown
  ): Promise<UserProgressType[]> {
    if (ctx.userId) {
      return ctx.prisma.userProgress.findMany({
        where: {
          userId: ctx.userId,
        },
      });
    } else {
      throw new Error(`Unable to retrieve user information.`);
    }
  },
};
