import { Series as SeriesType } from "@prisma/client";
import { Context } from "../../utils";

export const Series = {
  async episodes(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.episode.findMany({
      where: {
        seriesId: parent.id,
      },
    });
  },

  async prequel(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .prequel();
  },

  async sequel(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .sequel();
  },

  async sideStory(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .sideStory();
  },

  async mainStory(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .mainStory();
  },

  async related(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .related();
  },

  async relatedAlternative(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.series
      .findOne({
        where: { id: parent.id },
      })
      .relatedAlternative();
  },

  async references(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.reference.findMany({
      where: {
        seriesId: parent.id,
      },
    });
  },

  async progress(parent: SeriesType, _args: any, ctx: Context) {
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

  async progresses(parent: SeriesType, _args: any, ctx: Context) {
    return ctx.prisma.userProgress.findMany({
      where: { seriesId: parent.id },
    });
  },
};
