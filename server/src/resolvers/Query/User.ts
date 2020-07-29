import { FindOneUserArgs, User as UserType } from '@prisma/client';
import { Context } from '../../utils';

export const User = {
  async loggedIn(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<UserType | null> {
    const user = await ctx.prisma.user.findOne({
      where: { id: ctx.userId },
    });
    return user;
  },

  async user(
    _parent: unknown,
    args: FindOneUserArgs,
    ctx: Context
  ): Promise<UserType | null> {
    const user = await ctx.prisma.user.findOne(args);
    return user;
  },

  async users(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<UserType[]> {
    const user = await ctx.prisma.user.findMany({
      orderBy: {
        username: 'asc',
      },
    });
    return user;
  },

  async isInitialized(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<boolean> {
    const count = await ctx.prisma.user.count();
    return count !== 0;
  },
};
