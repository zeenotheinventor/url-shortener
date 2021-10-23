import { buildSchemaSync } from "type-graphql";
import { UrlResolver } from "./UrlResolver";

export { UrlResolver } from "./UrlResolver";

export const schema = buildSchemaSync({
  resolvers: [UrlResolver],
  emitSchemaFile: true,
});
