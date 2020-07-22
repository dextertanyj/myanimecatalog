import { Role } from '@prisma/client';
import { or, rule, shield } from 'graphql-shield';
import { Context } from '../utils';

// Rules

const rules = {
  isAuthenticatedUser: rule()(
    async (_parent: unknown, _args: unknown, ctx: Context) => {
      console.log('test');
      return Boolean(ctx.userId);
    }
  ),

  isAdminUser: rule()(
    async (_parent: unknown, _args: unknown, ctx: Context) => {
      if (!ctx.userId) {
        return false;
      }
      const user = await ctx.prisma.user.findOne({
        where: { id: ctx.userId },
        select: { role: true },
      });
      return !!user && user?.role === Role.ADMIN;
    }
  ),

  isWriteUser: rule()(
    async (_parent: unknown, _args: unknown, ctx: Context) => {
      if (!ctx.userId) {
        return false;
      }
      const user = await ctx.prisma.user.findOne({
        where: { id: ctx.userId },
        select: { role: true },
      });
      return !!user && user?.role === Role.WRITE;
    }
  ),

  isReadOnlyUser: rule()(
    async (_parent: unknown, _args: unknown, ctx: Context) => {
      if (!ctx.userId) {
        return false;
      }
      const user = await ctx.prisma.user.findOne({
        where: { id: ctx.userId },
        select: { role: true },
      });
      return !!user && user?.role === Role.READONLY;
    }
  ),
};

// Permissions

export const permissions = shield(
  {
    Query: {
      loggedIn: rules.isAuthenticatedUser,
      user: rules.isAuthenticatedUser,
      users: rules.isAdminUser,
      series: rules.isAuthenticatedUser,
      allSeries: rules.isAuthenticatedUser,
    },
    Mutation: {
      createSeries: or(rules.isWriteUser, rules.isAdminUser),
      updateSeries: or(rules.isWriteUser, rules.isAdminUser),
      deleteSeries: or(rules.isWriteUser, rules.isAdminUser),
      createUser: rules.isAdminUser,
      updateMe: rules.isAuthenticatedUser,
      updateUser: rules.isAdminUser,
      deleteUser: rules.isAdminUser,
    },
  },
  { allowExternalErrors: true }
);
