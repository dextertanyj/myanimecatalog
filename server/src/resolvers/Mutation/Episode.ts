import { Episode as EpisodeType, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Context } from '../../utils';

type BatchCreateEpisodeArgs = {
  data: [Prisma.EpisodeCreateInput];
};

export const Episode = {
  async createEpisode(
    _parent: unknown,
    args: Prisma.EpisodeCreateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType> {
    return await ctx.prisma.episode.create(args);
  },

  async batchCreateEpisode(
    _parent: unknown,
    args: BatchCreateEpisodeArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType[]> {
    const createOperation = args.data.map(
      async (input: Prisma.EpisodeCreateInput) => {
        return await ctx.prisma.episode.create({
          data: input,
        });
      }
    );

    const created = await Promise.all(createOperation);

    return created;
  },

  async updateEpisode(
    _parent: unknown,
    args: Prisma.EpisodeUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType> {
    return await ctx.prisma.episode.update(args);
  },

  async deleteEpisode(
    _parent: unknown,
    args: Prisma.EpisodeDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType> {
    try {
      return await ctx.prisma.episode.delete(args);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        const message: string = error.message;
        if (message.includes('`File`')) {
          throw new Error(
            `Please remove all associated files before deleting the episode.`
          );
        }
      }
      throw error;
    }
  },
};
