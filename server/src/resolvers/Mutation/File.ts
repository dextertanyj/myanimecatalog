import {
  File as FileType,
  FileCreateArgs,
  FileDeleteArgs,
  FileUpdateArgs,
} from '@prisma/client';
import { Context } from '../../utils';

export const File = {
  async createFile(
    _parent: unknown,
    args: FileCreateArgs,
    ctx: Context
  ): Promise<FileType | null> {
    return ctx.prisma.file.create(args);
  },

  async updateFile(
    _parent: unknown,
    args: FileUpdateArgs,
    ctx: Context
  ): Promise<FileType> {
    return ctx.prisma.file.update(args);
  },

  async deleteFile(
    _parent: unknown,
    args: FileDeleteArgs,
    ctx: Context
  ): Promise<FileType> {
    return ctx.prisma.file.delete(args);
  },
};
