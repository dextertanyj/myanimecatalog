import {
  Episode as EpisodeType,
  EpisodeCreateArgs,
  EpisodeCreateInput,
  EpisodeDeleteArgs,
  EpisodeUpdateArgs,
} from '@prisma/client';
import { Context } from '../../utils';

type BatchCreateEpisodeArgs = {
  data: [EpisodeCreateInput];
};

export const Episode = {
  async createEpisode(
    _parent: unknown,
    args: EpisodeCreateArgs,
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
    const createOperation = args.data.map(async (input: EpisodeCreateInput) => {
      return await ctx.prisma.episode.create({
        data: input,
      });
    });

    const created = await Promise.all(createOperation);

    return created;
  },

  async updateEpisode(
    _parent: unknown,
    args: EpisodeUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType> {
    return await ctx.prisma.episode.update(args);
  },

  async deleteEpisode(
    _parent: unknown,
    args: EpisodeDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType> {
    try {
      return await ctx.prisma.episode.delete(args);
    } catch (error) {
      const message: string = error.message;
      if (message.includes('`File`')) {
        throw new Error(
          `Please remove all associated files before deleting the episode.`
        );
      }
      throw error;
    }
  },
};
