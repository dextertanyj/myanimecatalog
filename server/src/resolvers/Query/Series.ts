import { FindOneSeriesArgs, Series as SeriesType } from "@prisma/client";
import { Context } from "../../utils";

export const Series = {
  async series(_parent: unknown, args: FindOneSeriesArgs, ctx: Context): Promise<SeriesType | null> {
    return await ctx.prisma.series.findOne(args);
  },

  async allSeries(_parent: unknown, _args: unknown, ctx: Context): Promise<SeriesType[]> {
    return await ctx.prisma.series.findMany();
  },
}