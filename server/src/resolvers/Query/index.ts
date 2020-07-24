import { Episode as EpisodeType, Series as SeriesType } from '@prisma/client';
import { Context } from '../../utils';
import { Episode } from './Episode';
import { Series } from './Series';
import { User } from './User';

type SearchPayload = {
  series: SeriesType[];
  episodes: EpisodeType[];
};

export const Query = {
  ...User,
  ...Series,
  ...Episode,

  async quickSearch(
    _parent: unknown,
    args: { where: string },
    ctx: Context
  ): Promise<SearchPayload> {
    const series = await ctx.prisma.series.findMany({
      where: {
        OR: [
          {
            title: {
              contains: args.where,
            },
          },
          {
            alternativeTitles: {
              some: {
                title: {
                  contains: args.where,
                },
              },
            },
          },
        ],
      },
    });
    const episodes = await ctx.prisma.episode.findMany({
      where: {
        OR: [
          {
            title: {
              contains: args.where,
            },
          },
          {
            alternativeTitles: {
              some: {
                title: {
                  contains: args.where,
                },
              },
            },
          },
        ],
      },
    });
    return { series, episodes };
  },
};
