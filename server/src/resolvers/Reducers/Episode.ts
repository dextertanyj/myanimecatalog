import {
  AlternativeTitle,
  Episode as EpisodeType,
  File,
  Series,
} from '@prisma/client';
import { Context } from '../../utils';

export const Episode = {
  async alternativeTitles(
    parent: EpisodeType,
    _args: unknown,
    ctx: Context
  ): Promise<AlternativeTitle[]> {
    return ctx.prisma.alternativeTitle.findMany({
      where: {
        episodeId: parent.id,
      },
    });
  },

  async series(
    parent: EpisodeType,
    _args: unknown,
    ctx: Context
  ): Promise<Series | null> {
    return ctx.prisma.series.findOne({
      where: { id: parent.seriesId },
    });
  },

  async files(
    parent: EpisodeType,
    _args: unknown,
    ctx: Context
  ): Promise<File[]> {
    return ctx.prisma.episode
      .findOne({
        where: { id: parent.id },
      })
      .files();
  },
};
