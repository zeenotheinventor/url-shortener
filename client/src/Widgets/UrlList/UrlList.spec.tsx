import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import UrlList from ".";
import { Url } from "./graphql";
import { MockedProvider } from "@apollo/client/testing";

const subject = () => {
  return render(
    <MockedProvider mocks={[]} addTypename={false}>
      <UrlList />
    </MockedProvider>
  );
};

describe("UrlList", () => {
  it("renders the table headers", () => {
    const { container } = subject();

    expect(container).toHaveTextContent("Index");
    expect(container).toHaveTextContent("Short URL");
    expect(container).toHaveTextContent("Long URL");
  });

  it("renders the list or URLs", () => {
    const { container } = subject();

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

    const checkUrlRenders = ({ longUrl, shortUrl }: Url): void => {
      expect(container).toHaveTextContent(longUrl);
      expect(container).toHaveTextContent(shortUrl);
    };

    testUrls.map(checkUrlRenders);
  });
});
