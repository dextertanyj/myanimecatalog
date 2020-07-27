import { Series, UserProgress as UserProgressType } from '@prisma/client';
import { Context } from '../../utils';

export const UserProgress = {
  async series(
    parent: UserProgressType,
    _args: unknown,
    ctx: Context
  ): Promise<Series | null> {
    return await ctx.prisma.series.findOne({
      where: {
        id: parent.seriesId,
      },
    });
  },
};
