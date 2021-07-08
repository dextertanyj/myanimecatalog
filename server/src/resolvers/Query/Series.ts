import { Prisma, Series as SeriesType } from '@prisma/client';
import { Context } from '../../utils';

export const Series = {
  async series(
    _parent: unknown,
    args: Prisma.SeriesFindUniqueArgs,
    ctx: Context
  ): Promise<SeriesType | null> {
    return await ctx.prisma.series.findUnique(args);
  },

  async allSeries(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return await ctx.prisma.series.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  },

  async totalSeriesCount(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<number> {
    return await ctx.prisma.series.count();
  },
};
