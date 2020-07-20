import { Episode as EpisodeType } from "@prisma/client";
import { Context } from "../../utils";

export const Episode = {
  async alternativeTitles(parent: EpisodeType, _args: any, ctx: Context) {
    return ctx.prisma.alternativeTitle.findMany({
      where: {
        episodeId: parent.id,
      },
    });
  },

  async series(parent: EpisodeType, _args: any, ctx: Context) {
    return ctx.prisma.series.findOne({
      where: { id: parent.seriesId },
    });
  },

  async files(parent: EpisodeType, _args: any, ctx: Context) {
    return ctx.prisma.episode
      .findOne({
        where: { id: parent.id },
      })
      .files();
  },
};
