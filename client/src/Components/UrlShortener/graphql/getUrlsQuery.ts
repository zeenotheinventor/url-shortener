import { gql } from "@apollo/client";

export const GetUrlsQueryDocument = gql`
  query {
    urls {
      id
      longUrl
      shortUrl
    }
  }
`;
