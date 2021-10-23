import { ExecutionResult } from "graphql";
import { Url } from "../../../entities";
import { fireGraphQLCall, createTestConnection } from "../../../testUtils";
import { Connection } from "typeorm";
import { GenerateShortUrlInput } from "../types";
import { generateShortUrlDocument, getUrlsDocument } from "./UrlDocuments";

describe("UrlResolver", () => {
  let conn: Connection;
  beforeAll(async () => {
    conn = await createTestConnection();
  });

  afterAll(async () => {
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
    const longUrl: string = "https://www.dadamugamazino.com";
    const response: ExecutionResult = await generateShortUrl(longUrl);

    const expectedResponse: ExecutionResult = {
      data: {
        url: {
          longUrl,
        },
      },
    };

    const shortUrl: string = response.data?.generateShortUrl.shortUrl;
    const shortUuid: string = shortUrl.split(
      `${process.env.SHORTENER_DOMAIN}/`
    )[1];

    const matchAlphaNumeric: RegExp = /[a-z0-9]*$/;

    expect(shortUuid).toMatch(matchAlphaNumeric);
    expect(response.errors).toBeUndefined();
    expect(shortUuid).toHaveLength(8);

    const databaseResult = await Url.findOne(expectedResponse.data?.url);
    expect(databaseResult).toEqual(
      expect.objectContaining(expectedResponse.data?.url)
    );
  });

  it("retrieves all URLs", async () => {
    // populate db with URLs
    const longUrls: string[] = [
      "https://www.dadamugamazino.com",
      "https://primarybid.com/uk",
      "https://www.synthcity.io",
    ];
    longUrls.forEach(async (longUrl) => await generateShortUrl(longUrl));

    // Retrieve all URLs
    const response: ExecutionResult = await fireGraphQLCall(getUrlsDocument);
    const expectedResponse: ExecutionResult = {
      data: {
        url: [
          {
            shortUrl: `${process.env.SHORTENER_DOMAIN}/abcdwxyz`,
            longUrl: "https://www.dadamugamazino.com",
          },
          {
            shortUrl: `${process.env.SHORTENER_DOMAIN}/asklaoqi`,
            longUrl: "https://www.dadamugamazino.com",
          },
          {
            shortUrl: `${process.env.SHORTENER_DOMAIN}/alowiksj`,
            longUrl: "https://www.dadamugamazino.com",
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

    expect(response.errors).not.toBeNull();
  });
});
