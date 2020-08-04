import { Context } from '../../utils';

type Source = {
  source: string;
};

export const Reference = {
  async suggestedSources(
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<Source[]> {
    const SQL = `SELECT DISTINCT source FROM \`Reference\``;
    return await ctx.prisma.queryRaw<Source[]>(SQL);
  },
};
