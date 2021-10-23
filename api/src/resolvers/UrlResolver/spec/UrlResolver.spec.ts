import { ExecutionResult } from "graphql";
import { Url } from "../../../entities";
import { fireGraphQLCall, createTestConnection } from "../../../testUtils";
import { Connection, DeepPartial } from "typeorm";
import { GenerateShortUrlInput } from "../types";
import { generateShortUrlDocument, getUrlsDocument } from "./UrlDocuments";

describe("UrlResolver", () => {
  let conn: Connection;
  beforeAll(async () => {
    conn = await createTestConnection();
  });

  afterAll(async () => {
    await Url.clear();
    await conn.close();
  });

  const generateShortUrl = async (
    longUrl: string
  ): Promise<ExecutionResult> => {
    const generateShortUrlInput: GenerateShortUrlInput = {
      longUrl,
    };

    return await fireGraphQLCall(generateShortUrlDocument, {
      input: generateShortUrlInput,
    });
  };

  it("creates a valid shortened URL", async () => {
    const longUrl: string = "https://www.google.com";
    const response: ExecutionResult = await generateShortUrl(longUrl);

    const shortUrl: string = response.data?.generateShortUrl.shortUrl;
    const shortUuid: string = shortUrl.replace(
      `${process.env.SHORTENER_DOMAIN}/`,
      ""
    );

    const matchAlphaNumeric: RegExp = /[a-z0-9]*$/;

    expect(shortUuid).toMatch(matchAlphaNumeric);
    expect(response.errors).toBeUndefined();
    expect(shortUuid).toHaveLength(8);

    const expectedDataEntry: DeepPartial<Url> = {
      longUrl,
      shortUrl,
    };

    const databaseResult = await Url.findOne(expectedDataEntry);
    expect(databaseResult).toEqual(expect.objectContaining(expectedDataEntry));
  });

  it("retrieves all URLs", async () => {
    // populate db with URLs
    const longUrls: string[] = [
      "https://www.dadamugamazino.com",
      "https://primarybid.com/uk",
      "https://www.synthcity.io",
    ];

    for (const longUrl of longUrls) {
      await generateShortUrl(longUrl);
    }
    // Retrieve all URLs
    const response: ExecutionResult = await fireGraphQLCall(getUrlsDocument);
    const expectedResponse: ExecutionResult = {
      data: {
        urls: [
          {
            longUrl: "https://www.dadamugamazino.com",
          },
          {
            longUrl: "https://primarybid.com/uk",
          },
          {
            longUrl: "https://www.synthcity.io",
          },
        ],
      },
    };

    expect(response.errors).toBeUndefined();
    expect(response).toEqual(expectedResponse);
  });

  it("returns an error if url is invalid", async () => {
    const invalidURL: string = "this is not a real URL";
    const response: ExecutionResult = await generateShortUrl(invalidURL);

    expect(response.errors).toBeDefined();
  });
});
