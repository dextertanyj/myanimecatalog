import {
  Series as SeriesType,
  UserProgress,
  WatchStatus,
} from '@prisma/client';
import { Context } from '../../utils';

export const Dashboard = {
  async myTopTenSeries(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    if (ctx.userId) {
      const topTenRatings = await ctx.prisma.userProgress.findMany({
        where: {
          AND: [
            {
              userId: ctx.userId,
            },
            {
              overall: {
                not: null,
              },
            },
          ],
        },
        orderBy: {
          overall: 'desc',
        },
        take: 10,
      });
      const topTenIds = topTenRatings.map(
        (progress: UserProgress) => progress.seriesId
      );
      const topTenSeries = await ctx.prisma.series.findMany({
        where: {
          id: {
            in: topTenIds,
          },
        },
      });
      return topTenSeries;
    } else {
      throw new Error(`Unable to retrieve user information`);
    }
  },

  async myCurrentlyWatching(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    if (ctx.userId) {
      const currentlyWatching = await ctx.prisma.userProgress.findMany({
        where: {
          AND: [
            {
              userId: ctx.userId,
            },
            {
              status: WatchStatus.WATCHING,
            },
          ],
        },
      });
      const currentlyWatchingIds = currentlyWatching.map(
        (progress: UserProgress) => progress.seriesId
      );
      const currentlyWatchingSeries = await ctx.prisma.series.findMany({
        where: {
          id: {
            in: currentlyWatchingIds,
          },
        },
      });
      return currentlyWatchingSeries;
    } else {
      throw new Error(`Unable to retrieve user information`);
    }
  },
};
