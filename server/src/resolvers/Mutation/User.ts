import {
  Role,
  User as UserType,
  UserCreateArgs,
  UserDeleteArgs,
  UserUpdateArgs,
  UserUpdateInput,
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
    try {
      const encryptPassword = await bcrypt.hash(data.password, 10);
      const user = await ctx.prisma.user.create({
        data: {
          ...data,
          password: encryptPassword,
          username: data.username.toLowerCase().trim(),
        },
      });
      return user;
    } catch (error) {
      const message: string = error.message;
      if (message.includes(`Unique`)) {
        throw new Error(
          `That username has been taken. Please choose another one.`
        );
      } else {
        throw error;
      }
    }
  },

  async updateMe(
    _parent: unknown,
    { data }: { data: UserUpdateInput & { currentPassword: string } },
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    try {
      const encryptPassword = data.password
        ? await bcrypt.hash(data?.password, 10)
        : undefined;
      if (encryptPassword) {
        const user = await ctx.prisma.user.findOne({
          where: { id: ctx.userId },
        });
        if (user) {
          const valid = await bcrypt.compare(
            data.currentPassword,
            user?.password
          );
          if (!valid) {
            throw new Error(`Current password is incorrect`);
          }
        }
      }
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          name: data.name,
          password: encryptPassword,
          username: data.username?.toLowerCase().trim(),
        },
      });
      return user;
    } catch (error) {
      const message: string = error.message;
      if (message.includes(`Unique`)) {
        throw new Error(
          `That username has been taken. Please choose another one.`
        );
      } else {
        throw error;
      }
    }
  },

  async updateUser(
    _parent: unknown,
    { where, data }: UserUpdateArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    try {
      const encryptPassword = data.password
        ? await bcrypt.hash(data?.password, 10)
        : undefined;
      if (where.id === ctx.userId) {
        if (data.role && data.role !== Role.ADMIN) {
          throw new Error(
            `Operation not supported: Cannot change access level of current account.`
          );
        }
      }
      const user = await ctx.prisma.user.update({
        where,
        data: {
          ...data,
          username: data.username?.toLowerCase().trim(),
          password: encryptPassword,
        },
      });
      return user;
    } catch (error) {
      const message: string = error.message;
      if (message.includes(`Unique`)) {
        throw new Error(
          `That username has been taken. Please choose another one.`
        );
      } else {
        throw error;
      }
    }
  },

  async deleteUser(
    _parent: unknown,
    args: UserDeleteArgs,
    ctx: Context,
    _info: unknown
  ): Promise<UserType> {
    try {
      const user = await ctx.prisma.user.delete(args);
      return user;
    } catch (error) {
      const message: string = error.message;
      if (message.includes(`UserProgress`)) {
        if (args.where.id) {
          const user = await ctx.prisma.queryRaw<UserType>(
            `SELECT * FROM \`User\` WHERE id = '${args.where.id}'`
          );
          await ctx.prisma.executeRaw(
            `DELETE FROM \`User\` WHERE id = '${args.where.id}'`
          );
          return user;
        } else {
          throw error;
        }
      }
      throw error;
    }
  },
};
