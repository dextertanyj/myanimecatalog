import { FindOneUserArgs, User as UserType } from "@prisma/client";
import { Context } from "../../utils";

export const User = {
  async loggedIn(
    _parent: any,
    _args: any,
    ctx: Context
  ): Promise<UserType | null> {
    const user = await ctx.prisma.user.findOne({
      where: { id: ctx.userId },
    });
    return user;
  },

  async user(
    _parent: any,
    args: FindOneUserArgs,
    ctx: Context
  ): Promise<UserType | null> {
    const user = await ctx.prisma.user.findOne(args);
    return user;
  },

  async users(_parent: any, _args: any, ctx: Context): Promise<UserType[]> {
    const user = await ctx.prisma.user.findMany();
    return user;
  },

  async userCount(_parent: any, _args: any, ctx: Context): Promise<number> {
    const count = await ctx.prisma.user.count();
    return count;
  },
};
