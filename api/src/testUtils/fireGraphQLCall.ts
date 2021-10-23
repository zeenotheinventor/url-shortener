import { graphql } from "graphql";
import { schema } from "../resolvers";
export const fireGraphQLCall = async (query: string, variables?: any) => {
  return graphql(schema, query, undefined, undefined, variables);
};
