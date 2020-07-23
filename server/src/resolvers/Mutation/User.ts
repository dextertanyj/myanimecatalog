import {
  User as UserType,
  UserCreateArgs,
  UserDeleteArgs,
  UserUpdateArgs,
} from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Context } from '../../utils';

export const User = {
  async createInitialUser(
    _parent: unknown,
    { data }: UserCreateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    if ((await ctx.prisma.user.count()) !== 0) {
      throw new Error(`There is an existing account.`);
    }
    const encryptPassword = await bcrypt.hash(data.password, 10);
    const user = await ctx.prisma.user.create({
      data: {
        ...data,
        password: encryptPassword,
        username: data.username.toLowerCase().trim(),
      },
    });
    return user;
  },

  async createUser(
    _parent: unknown,
    { data }: UserCreateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    const encryptPassword = await bcrypt.hash(data.password, 10);
    const user = await ctx.prisma.user.create({
      data: {
        ...data,
        password: encryptPassword,
        username: data.username.toLowerCase().trim(),
      },
    });
    return user;
  },

  async updateMe(
    _parent: unknown,
    { data }: UserUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    const encryptPassword = data.password
      ? await bcrypt.hash(data?.password, 10)
      : undefined;
    const user = await ctx.prisma.user.update({
      where: {
        id: ctx.userId,
      },
      data: {
        ...data,
        password: encryptPassword,
        username: data.username?.toLowerCase().trim(),
      },
    });
    return user;
  },

  async updateUser(
    _parent: unknown,
    { where, data }: UserUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    const encryptPassword = data.password
      ? await bcrypt.hash(data?.password, 10)
      : undefined;
    const user = await ctx.prisma.user.update({
      where,
      data: {
        ...data,
        username: data.username?.toLowerCase().trim(),
        password: encryptPassword,
      },
    });
    return user;
  },

  async deleteUser(
    _parent: unknown,
    args: UserDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    const user = await ctx.prisma.user.delete(args);
    return user;
  },
};
