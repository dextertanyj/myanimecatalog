import { User, UserUpdateArgs } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Context } from '../../utils';

type AuthPayload = {
  token: string;
  user: User;
};

export const Auth = {
  async login(
    _parent: unknown,
    { data }: UserUpdateArgs,
    ctx: Context
  ): Promise<AuthPayload> {
    if (!data?.username || !data?.password) {
      throw new Error('Login failed.');
    }

    const user = await ctx.prisma.user.findOne({
      where: { username: data.username.toLowerCase().trim() },
    });

    if (!user) {
      throw new Error(`Either your username or password is incorrect.`);
    }

    if (user.passwordAttempts > 10) {
      throw new Error(
        `Your account has been locked. Please contact an administrator.`
      );
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      await ctx.prisma.user.update({
        where: { username: data.username.toLowerCase().trim() },
        data: { passwordAttempts: (user.passwordAttempts || 0) + 1 },
      });
      throw new Error(`Either your username or password is incorrect.`);
    }

    await ctx.prisma.user.update({
      where: { username: data.username.toLowerCase().trim() },
      data: { passwordAttempts: 0 },
    });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET ?? ''),
      user,
    };
  },
};
