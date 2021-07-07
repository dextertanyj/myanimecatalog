import { Episode as EpisodeType, Prisma } from '@prisma/client';
import { Context } from '../../utils';

export const Episode = {
  async episode(
    _parent: unknown,
    args: Prisma.EpisodeFindUniqueArgs,
    ctx: Context
  ): Promise<EpisodeType | null> {
    return await ctx.prisma.episode.findUnique(args);
  },

  async episodes(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<EpisodeType[]> {
    return await ctx.prisma.episode.findMany({
      orderBy: {
        episodeNumber: 'asc',
      },
    });
  },

  async episodesInSeries(
    _parent: unknown,
    args: Prisma.SeriesFindUniqueArgs,
    ctx: Context
  ): Promise<EpisodeType[]> {
    if (args.where.id) {
      return await ctx.prisma.episode.findMany({
        where: {
          seriesId: args.where.id,
        },
        orderBy: {
          episodeNumber: 'asc',
        },
      });
    } else {
      throw new Error(`No series was specified.`);
    }
  },
};
