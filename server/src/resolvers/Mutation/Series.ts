import { Prisma, Series as SeriesType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Context } from '../../utils';

export const Series = {
  async createSeries(
    _parent: unknown,
    { data }: Prisma.SeriesCreateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<SeriesType> {
    if (data.progress?.create) {
      const currentUserId = ctx.userId;
      const { progress, ...rest } = data;
      if (currentUserId && progress.create && !Array.isArray(progress.create)) {
        const { userId, ...others } = progress.create;
        const formatProgress = {
          create: {
            user: { connect: { id: currentUserId } },
            ...others,
          },
        };
        const series = await ctx.prisma.series.create({
          data: {
            progress: formatProgress,
            ...rest,
          },
        });
        return series;
      } else {
        throw new Error(`Something went wrong.`);
      }
    } else {
      const { progress, ...rest } = data;
      const series = await ctx.prisma.series.create({
        data: {
          ...rest,
        },
      });
      return series;
    }
  },

  async updateSeries(
    _parent: unknown,
    { where, data }: Prisma.SeriesUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<SeriesType> {
    const { progress, ...rest } = data;
    const currentUserId = ctx.userId;
    if (progress?.create) {
      if (
        currentUserId &&
        !Array.isArray(progress.create) &&
        !progress.update
      ) {
        const { userId, ...others } = progress.create;
        const formatProgress = {
          create: {
            user: { connect: { id: currentUserId } },
            ...others,
          },
        };
        const series = await ctx.prisma.series.update({
          where,
          data: {
            progress: formatProgress,
            ...rest,
          },
        });
        return series;
      } else {
        throw new Error(`Unable to update series.`);
      }
    } else if (progress?.update) {
      if (
        currentUserId &&
        !Array.isArray(progress.update) &&
        !progress.create
      ) {
        const { user, userId, ...others } = progress.update.data;
        const formatProgress = {
          update: {
            where: {
              ...progress.update.where,
            },
            data: {
              user: { connect: { id: currentUserId } },
              ...others,
            },
          },
        };
        const series = await ctx.prisma.series.update({
          where,
          data: {
            progress: formatProgress,
            ...rest,
          },
        });
        return series;
      } else {
        throw new Error(`Unable to update series.`);
      }
    } else {
      const series = await ctx.prisma.series.update({
        where,
        data: {
          ...rest,
        },
      });
      return series;
    }
  },

  async deleteSeries(
    _parent: unknown,
    args: Prisma.SeriesDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<SeriesType> {
    try {
      return await ctx.prisma.series.delete(args);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        const message: string = error.message;
        if (message.includes('`UserProgress`')) {
          throw new Error(
            `Unable to delete series as there are existing watch progress records.`
          );
        }
      }
      throw error;
    }
  },
};
