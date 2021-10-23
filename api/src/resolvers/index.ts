import { buildSchemaSync } from "type-graphql";
import { HelloWorldResolver } from "./HelloWorldResolver";
import { UrlResolver } from "./UrlResolver";

export { UrlResolver } from "./UrlResolver";

export const schema = buildSchemaSync({
  resolvers: [UrlResolver, HelloWorldResolver],
  emitSchemaFile: true,
});
