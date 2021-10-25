import { GetUrlsQueryDocument } from "..";

export const mockGetUrlsQuery = () => ({
  request: {
    query: GetUrlsQueryDocument,
    variables: {},
  },
  result: {
    data: {
      urls: [
        {
          id: "uuid-value1",
          longUrl: "https://www.primarybid.com",
          shortUrl: "https://bit.ly/auwhssfs",
        },
        {
          id: "uuid-value2",
          longUrl: "https://www.dadamugamazino.com",
          shortUrl: "https://bit.ly/2nsk2nsl",
        },
        {
          id: "uuid-value3",
          longUrl: "https://www.hsbc.co.uk?id=24&password=so_secret",
          shortUrl: "https://bit.ly/akl9sj2s",
        },
      ],
    },
  },
});
