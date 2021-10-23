import { ExecutionResult } from "graphql";
import { Url } from "src/entities";
import { fireGraphQLCall } from "src/testUtils";

describe("UrlResolver", () => {
  const generateShortUrl = async (
    longUrl: string
  ): Promise<ExecutionResult> => {
    return await fireGraphQLCall(generateShortUrlDocument, {
      input: longUrl,
    });
  };

  it("creates a shortened 8 character URL", async () => {
    const longUrl: string = "https://www.dadamugamazino.com";
    const response: ExecutionResult = await generateShortUrl(longUrl);

    const expectedResponse: ExecutionResult = {
      data: {
        url: {
          shortUrl: `${process.env.SHORTENER_DOMAIN}/abcdwxyz`,
          longUrl,
        },
      },
    };

    expect(response.errors).toBeUndefined();
    expect(response).toEqual(expectedResponse);
    expect(response.data?.url).toHaveLength(8);

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
    longUrls.forEach(async (url) => await generateShortUrl(url));

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
