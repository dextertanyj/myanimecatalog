import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

function isValidDateString(dateString: string): Date | null {
  const date = new Date(dateString);
  if (date instanceof Date && isFinite(date.getTime())) {
    return date;
  } else {
    return null;
  }
}

export const DateTime = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type',
    parseValue: isValidDateString,
    serialize(value: Date) {
      return value.toISOString();
    },
    parseLiteral(ast: ValueNode) {
      if (ast.kind === Kind.STRING) {
        return isValidDateString(ast.value);
      } else {
        throw new Error(`Invalid value provided`);
      }
    },
  }),
};
