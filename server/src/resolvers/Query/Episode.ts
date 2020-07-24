import {
  Episode as EpisodeType,
  FindOneEpisodeArgs,
  FindOneSeriesArgs,
} from '@prisma/client';
import { Context } from '../../utils';

export const Episode = {
  async episode(
    _parent: unknown,
    args: FindOneEpisodeArgs,
    ctx: Context
  ): Promise<EpisodeType | null> {
    return await ctx.prisma.episode.findOne(args);
  },

  async episodes(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<EpisodeType[]> {
    return await ctx.prisma.episode.findMany();
  },

  async episodesInSeries(
    _parent: unknown,
    args: FindOneSeriesArgs,
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
