import { Field, InputType } from "type-graphql";

@InputType()
export class GenerateShortUrlInput {
  @Field()
  longUrl: string;
}
