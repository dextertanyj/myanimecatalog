import { File as FileType, Prisma } from '@prisma/client';
import { Context } from '../../utils';

export const File = {
  async createFile(
    _parent: unknown,
    args: Prisma.FileCreateArgs,
    ctx: Context
  ): Promise<FileType | null> {
    return ctx.prisma.file.create(args);
  },

  async updateFile(
    _parent: unknown,
    args: Prisma.FileUpdateArgs,
    ctx: Context
  ): Promise<FileType> {
    return ctx.prisma.file.update(args);
  },

  async deleteFile(
    _parent: unknown,
    args: Prisma.FileDeleteArgs,
    ctx: Context
  ): Promise<FileType> {
    return ctx.prisma.file.delete(args);
  },
};
