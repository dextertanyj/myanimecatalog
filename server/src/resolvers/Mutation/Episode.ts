import {
  Episode as EpisodeType,
  EpisodeCreateArgs,
  EpisodeDeleteArgs,
  EpisodeUpdateArgs,
} from '@prisma/client';
import { Context } from '../../utils';

export const Episode = {
  async createEpisode(
    _parent: unknown,
    args: EpisodeCreateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<EpisodeType> {
    return await ctx.prisma.episode.create(args);
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
    return await ctx.prisma.episode.delete(args);
  },
};
