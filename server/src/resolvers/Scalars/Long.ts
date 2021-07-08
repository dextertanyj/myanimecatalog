import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

function isNumber(value: unknown) {
  try {
    if (Number.isSafeInteger(Number(value))) {
      return Number(value);
    } else {
      return null;
    }
  } catch {
    throw new Error(`Invalid value provided.`);
  }
}

export const Long = {
  Long: new GraphQLScalarType({
    name: 'Long',
    description: 'Long (64-bit) custom scalar type',
    parseValue: isNumber,
    serialize: isNumber,
    parseLiteral(ast: ValueNode) {
      if (ast.kind === Kind.INT) {
        return ast.value;
      } else {
        throw new Error(`Invalid value provided`);
      }
    },
  }),
};
