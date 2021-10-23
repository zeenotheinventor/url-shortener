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

  describe("when url is valid", () => {
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
      const shortUrlRegex: RegExp = new RegExp(
        `^${process.env.SHORTENER_DOMAIN}/[a-z0-9]*$`
      );
      const expectedResponse: ExecutionResult = {
        data: {
          urls: [
            {
              id: expect.any(String),
              longUrl: "https://www.dadamugamazino.com",
              shortUrl: expect.stringMatching(shortUrlRegex),
            },
            {
              id: expect.any(String),
              longUrl: "https://primarybid.com/uk",
              shortUrl: expect.stringMatching(shortUrlRegex),
            },
            {
              id: expect.any(String),
              longUrl: "https://www.synthcity.io",
              shortUrl: expect.stringMatching(shortUrlRegex),
            },
          ],
        },
      };

      expect(response.errors).toBeUndefined();
      expect(response).toEqual(expectedResponse);
    });

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
        id: expect.any(String),
        longUrl,
        shortUrl,
      };

      const databaseResult = await Url.findOne({ shortUrl });
      expect(databaseResult).toEqual(expectedDataEntry);
    });
  });

  describe("when url is invalid", () => {
    const errorResponse = (message: string): DeepPartial<ExecutionResult> => {
      return {
        errors: [
          {
            message,
            locations: expect.any(Array),
            path: expect.any(Array),
            extensions: expect.any(Object),
          },
        ],
        data: null,
      };
    };

    it("prevents urls without http/https", async () => {
      const invalidURL: string = "www.youtube.com";
      const response: ExecutionResult = await generateShortUrl(invalidURL);

      const expectedResponse: DeepPartial<ExecutionResult> = errorResponse(
        "www.youtube.com is not a valid URL."
      );

      expect(response.data).toBeNull();
      expect(response).toEqual(expect.objectContaining(expectedResponse));
    });

    it("prevents urls with spaces", async () => {
      const invalidURL: string = "this is not a real URL";
      const response: ExecutionResult = await generateShortUrl(invalidURL);

      const expectedResponse: DeepPartial<ExecutionResult> = errorResponse(
        "this is not a real URL is not a valid URL."
      );

      expect(response.data).toBeNull();
      expect(response).toEqual(expect.objectContaining(expectedResponse));
    });

    it("prevents urls with invalid chars", async () => {
      const invalidURL: string = "http://www.££££££.com";
      const response: ExecutionResult = await generateShortUrl(invalidURL);

      const expectedResponse: DeepPartial<ExecutionResult> = errorResponse(
        "http://www.££££££.com is not a valid URL."
      );

      expect(response.data).toBeNull();
      expect(response).toEqual(expect.objectContaining(expectedResponse));
    });
  });
});
