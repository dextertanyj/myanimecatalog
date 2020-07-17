import { Episode as EpisodeType } from "@prisma/client";
import { Context } from "../../utils";

export const Episode = {
  async alternativeTitle(parent: EpisodeType, _args: any, ctx: Context) {
    return ctx.prisma.alternativeTitleName.findMany({
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
