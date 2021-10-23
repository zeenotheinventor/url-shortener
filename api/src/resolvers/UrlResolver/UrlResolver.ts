import { Url } from "../../entities";
import { Arg, Mutation, Resolver } from "type-graphql";
import { DeepPartial } from "typeorm";
import { GenerateShortUrlInput } from "./types";
import { customAlphabet } from "nanoid";
import { lowercase, numbers } from "nanoid-dictionary";

@Resolver()
export class UrlResolver {
  @Mutation(() => Url)
  async generateShortUrl(
    @Arg("input", () => GenerateShortUrlInput) input: GenerateShortUrlInput
  ) {
    const dictionary: string = lowercase + numbers;
    const shortUuid: string = customAlphabet(dictionary, 8)();
    const shortUrl: string = `${process.env.SHORTENER_DOMAIN}/${shortUuid}`;

    const url: DeepPartial<Url> = {
      longUrl: input.longUrl,
      shortUrl,
    };

    return await Url.create(url).save();
  }
}
