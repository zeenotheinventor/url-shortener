import { Url } from "../../entities";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { DeepPartial } from "typeorm";
import { GenerateShortUrlInput } from "./types";
import { customAlphabet } from "nanoid";
import { lowercase, numbers } from "nanoid-dictionary";
import { isWebUri } from "valid-url";
import { UserInputError } from "apollo-server-errors";

@Resolver()
export class UrlResolver {
  @Mutation(() => Url)
  async generateShortUrl(
    @Arg("input", () => GenerateShortUrlInput)
    { longUrl }: GenerateShortUrlInput
  ) {
    if (!isWebUri(longUrl)) {
      throw new UserInputError(`${longUrl} is not a valid URL.`);
    }

    const dictionary: string = lowercase + numbers;
    const shortUuid: string = customAlphabet(dictionary, 8)();
    const shortUrl: string = `${process.env.SHORTENER_DOMAIN}/${shortUuid}`;

    const url: DeepPartial<Url> = {
      longUrl,
      shortUrl,
    };

    return await Url.create(url).save();
  }

  @Query(() => [Url])
  async urls() {
    return await Url.find();
  }
}
