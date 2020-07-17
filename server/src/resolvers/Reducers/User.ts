import { User as UserType, UserProgress } from "@prisma/client";
import { Context } from "../../utils";

export const User = {
  async progress(
    parent: UserType,
    _args: any,
    ctx: Context
  ): Promise<UserProgress[]> {
    return ctx.prisma.userProgress.findMany({
      where: { userId: parent.id },
    });
  },
};
