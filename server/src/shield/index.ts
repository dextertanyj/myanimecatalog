import { Role } from "@prisma/client";
import { rule, shield } from "graphql-shield";
import { Context } from "../utils";

// Rules

const rules = {
  isAuthenticatedUser: rule()(
    async (_parent: any, _args: any, ctx: Context) => {
      return Boolean(ctx.userId);
    }
  ),

  isAdminUser: rule()(async (_parent: any, _args: any, ctx: Context) => {
    if (!ctx.userId) {
      return false;
    }
    const user = await ctx.prisma.user.findOne({
      where: { id: ctx.userId },
      select: { role: true },
    });
    return !!user && user?.role === Role.ADMIN;
  }),

  isWriteUser: rule()(async (_parent: any, _args: any, ctx: Context) => {
    if (!ctx.userId) {
      return false;
    }
    const user = await ctx.prisma.user.findOne({
      where: { id: ctx.userId },
      select: { role: true },
    });
    return !!user && user?.role === Role.WRITE;
  }),

  isReadOnlyUser: rule()(async (_parent: any, _args: any, ctx: Context) => {
    if (!ctx.userId) {
      return false;
    }
    const user = await ctx.prisma.user.findOne({
      where: { id: ctx.userId },
      select: { role: true },
    });
    return !!user && user?.role === Role.READONLY;
  }),
};

// Permissions

export const permissions = shield({
  Query: {
    loggedIn: rules.isAuthenticatedUser,
    user: rules.isAuthenticatedUser,
    users: rules.isAdminUser,
  },
});
