import {
  AlternativeTitle,
  Episode,
  Reference,
  Series as SeriesType,
  UserProgress,
  WatchStatus,
} from '@prisma/client';
import { Context } from '../../utils';

export const Series = {
  async alternativeTitles(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<AlternativeTitle[]> {
    return ctx.prisma.alternativeTitle.findMany({
      where: {
        seriesId: parent.id,
      },
    });
  },

  async episodes(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<Episode[]> {
    return ctx.prisma.episode.findMany({
      where: {
        seriesId: parent.id,
      },
    });
  },

  async prequels(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .prequels();
  },

  async sequels(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .sequels();
  },

  async sideStories(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .sideStories();
  },

  async mainStories(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .mainStories();
  },

  async relatedSeries(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .relatedSeries();
  },

  async relatedAlternatives(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<SeriesType[]> {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .relatedAlternatives();
  },

  async references(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<Reference[]> {
    return ctx.prisma.reference.findMany({
      where: {
        seriesId: parent.id,
      },
    });
  },

  async progress(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<UserProgress | null> {
    const userId = ctx.userId;
    if (!userId) {
      return null;
    }
    return ctx.prisma.userProgress.findOne({
      where: {
        seriesId_userId: {
          seriesId: parent.id,
          userId,
        },
      },
    });
  },

  async allProgress(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<UserProgress[]> {
    return ctx.prisma.userProgress.findMany({
      where: { seriesId: parent.id },
    });
  },

  async currentStatus(
    parent: SeriesType,
    _args: unknown,
    ctx: Context
  ): Promise<WatchStatus | null> {
    const userId = ctx.userId;
    if (!userId) {
      return null;
    }
    const progress = await ctx.prisma.userProgress.findOne({
      where: {
        seriesId_userId: {
          seriesId: parent.id,
          userId,
        },
      },
      select: {
        status: true,
      },
    });
    return progress?.status || null;
  },
};
