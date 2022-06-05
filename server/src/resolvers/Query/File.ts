import { File as FileType, Prisma } from '@prisma/client';
import { Context } from '../../utils';

type Codec = {
  codec: string;
};

export const File = {
  async file(
    _parent: unknown,
    args: Prisma.FileFindUniqueArgs,
    ctx: Context
  ): Promise<FileType | null> {
    return await ctx.prisma.file.findUnique(args);
  },

  async filesForEpisode(
    _parent: unknown,
    args: Prisma.EpisodeFindUniqueArgs,
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

  async suggestedCodecs(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<Codec[]> {
    return await ctx.prisma.file.findMany({
      distinct: ['codec'],
      select: {
        codec: true,
      },
    });
  },
};
