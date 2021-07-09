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
    return ctx.prisma.series.findUnique({
      where: { id: parent.seriesId },
    });
  },

  async files(
    parent: EpisodeType,
    _args: unknown,
    ctx: Context
  ): Promise<File[]> {
    return ctx.prisma.episode
      .findUnique({
        where: { id: parent.id },
      })
      .files();
  },

  async previous(
    parent: EpisodeType,
    _args: unknown,
    ctx: Context
  ): Promise<string | null> {
    return ctx.prisma.episode
      .findFirst({
        where: {
          seriesId: parent.seriesId,
          episodeNumber: {
            lt: parent.episodeNumber,
          },
        },
        orderBy: {
          episodeNumber: 'desc',
        },
      })
      .then((episode: EpisodeType | null) => episode?.id ?? null);
  },

  async next(
    parent: EpisodeType,
    _args: unknown,
    ctx: Context
  ): Promise<string | null> {
    return ctx.prisma.episode
      .findFirst({
        where: {
          seriesId: parent.seriesId,
          episodeNumber: {
            gt: parent.episodeNumber,
          },
        },
        orderBy: {
          episodeNumber: 'asc',
        },
      })
      .then((episode: EpisodeType | null) => episode?.id ?? null);
  },
};
