import {
  File as FileType,
  FindOneEpisodeArgs,
  FindOneFileArgs,
} from '@prisma/client';
import { Context } from '../../utils';

export const File = {
  async file(
    _parent: unknown,
    args: FindOneFileArgs,
    ctx: Context
  ): Promise<FileType | null> {
    return await ctx.prisma.file.findOne(args);
  },

  async filesForEpisode(
    _parent: unknown,
    args: FindOneEpisodeArgs,
    ctx: Context
  ): Promise<FileType[]> {
    return await ctx.prisma.file.findMany({
      where: {
        episodeId: args.where.id,
      },
    });
  },

  async files(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<FileType[]> {
    return await ctx.prisma.file.findMany();
  },
};
