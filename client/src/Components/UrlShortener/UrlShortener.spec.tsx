import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime/runtime";
import React from "react";
import { render, RenderResult, waitFor } from "@testing-library/react";
import UrlShortener from ".";
import { Url } from "./graphql";
import { MockedProvider } from "@apollo/client/testing";
import { mockGetUrlsQuery } from "./graphql/mocks/getUrlsQuery.mock";

describe("UrlShotener", () => {
  const subject = () => {
    return render(
      <MockedProvider mocks={[mockGetUrlsQuery()]} addTypename={false}>
        <UrlShortener />
      </MockedProvider>
    );
  };
  it("renders the table headers", async () => {
    const { container } = subject();

    await waitFor(() => {
      expect(container).toHaveTextContent("Index");
      expect(container).toHaveTextContent("Short URL");
      expect(container).toHaveTextContent("Long URL");
    });
  });

  it("renders the list of URLs from API", async () => {
    const { container }: RenderResult = subject();

    const testUrls: Url[] = [
      {
        longUrl: "https://www.primarybid.com",
        shortUrl: "https://bit.ly/auwhssfs",
      },
      {
        longUrl: "https://www.dadamugamazino.com",
        shortUrl: "https://bit.ly/2nsk2nsl",
      },
      {
        longUrl: "https://www.hsbc.co.uk?id=24&password=so_secret",
        shortUrl: "https://bit.ly/akl9sj2s",
      },
    ];

    const checkUrlRenders = async ({
      longUrl,
      shortUrl,
    }: Url): Promise<void> => {
      await waitFor(() => {
        expect(container).toHaveTextContent(longUrl);
        expect(container).toHaveTextContent(shortUrl);
      });
    };

    testUrls.map(checkUrlRenders);
  });
});
