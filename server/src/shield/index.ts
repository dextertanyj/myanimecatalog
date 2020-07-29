import { Role } from '@prisma/client';
import { or, rule, shield } from 'graphql-shield';
import { Context } from '../utils';

// Rules

const rules = {
  isAuthenticatedUser: rule()(
    async (_parent: unknown, _args: unknown, ctx: Context) => {
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
      totalSeriesCount: rules.isAuthenticatedUser,

      episode: rules.isAuthenticatedUser,
      episodes: rules.isAuthenticatedUser,
      episodesInSeries: rules.isAuthenticatedUser,

      file: rules.isAuthenticatedUser,
      filesForEpisode: rules.isAuthenticatedUser,
      files: rules.isAuthenticatedUser,

      myProgress: rules.isAuthenticatedUser,
      mySeriesProgress: rules.isAuthenticatedUser,
      userProgress: rules.isAuthenticatedUser,
      allUserProgress: rules.isAdminUser,

      reference: rules.isAuthenticatedUser,
      references: rules.isAuthenticatedUser,

      quickSearch: rules.isAuthenticatedUser,

      myTopTenSeries: rules.isAuthenticatedUser,
      myCurrentlyWatching: rules.isAuthenticatedUser,
    },
    Mutation: {
      updateMe: rules.isAuthenticatedUser,
      createUser: rules.isAdminUser,
      updateUser: rules.isAdminUser,
      deleteUser: rules.isAdminUser,

      createSeries: or(rules.isWriteUser, rules.isAdminUser),
      updateSeries: or(rules.isWriteUser, rules.isAdminUser),
      deleteSeries: or(rules.isWriteUser, rules.isAdminUser),

      createEpisode: or(rules.isWriteUser, rules.isAdminUser),
      batchCreateEpisode: or(rules.isWriteUser, rules.isAdminUser),
      updateEpisode: or(rules.isWriteUser, rules.isAdminUser),
      deleteEpisode: or(rules.isWriteUser, rules.isAdminUser),

      createFile: or(rules.isWriteUser, rules.isAdminUser),
      updateFile: or(rules.isWriteUser, rules.isAdminUser),
      deleteFile: or(rules.isWriteUser, rules.isAdminUser),

      createUserProgress: rules.isAuthenticatedUser,
      updateUserProgress: rules.isAuthenticatedUser,
      deleteUserProgress: rules.isAuthenticatedUser,
    },
  },
  { allowExternalErrors: true }
);
