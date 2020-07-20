import { Series as SeriesType, SeriesCreateArgs } from "@prisma/client";
import { Context } from "../../utils";

export const Series = {
  async createSeries(_parent: unknown, { data }: SeriesCreateArgs, ctx: Context, _info: unknown): Promise<SeriesType> {
    if (data.progress?.create) {
      const currentUserId = ctx.userId;
      const { progress, ...rest } = data;
      if (currentUserId && progress.create && !Array.isArray(progress.create)) {
        const { user, ...others } = progress.create
        const formatProgress = {
          create: {
            user: { connect: { id: currentUserId } },
            ...others,
          }
        };
        const series = await ctx.prisma.series.create({
          data: {
            progress: formatProgress,
            ...rest
          }
        });
        return series;
      } else {
        throw new Error(`Something went wrong.`)
      }
    } else { 
      const {progress, ...rest} = data;
      const series = await ctx.prisma.series.create({
        data: {
          ...rest,
        }
      });
      return series;
    }
  }
}