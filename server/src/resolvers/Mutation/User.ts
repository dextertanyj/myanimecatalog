import {
  User as UserType,
  UserCreateArgs,
  UserDeleteArgs,
  UserUpdateArgs,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { Context } from "../../utils";

export const User = {
  async createUser(
    _parent: any,
    { data }: UserCreateArgs,
    ctx: Context,
    _info: any
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

  async updateUser(
    _parent: any,
    { data }: UserUpdateArgs,
    ctx: Context,
    _info: any
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

  async adminUpdateUser(
    _parent: any,
    { where, data }: UserUpdateArgs,
    ctx: Context,
    _info: any
  ): Promise<UserType> {
    const user = await ctx.prisma.user.update({
      where,
      data: {
        ...data,
        username: data.username?.toLowerCase().trim(),
      },
    });
    return user;
  },

  async deleteUser(
    _parent: any,
    args: UserDeleteArgs,
    ctx: Context,
    _info: any
  ): Promise<UserType> {
    const user = await ctx.prisma.user.delete(args);
    return user;
  },
};
