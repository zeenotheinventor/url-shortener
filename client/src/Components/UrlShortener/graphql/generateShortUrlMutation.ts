import { gql } from "@apollo/client";

export const GenerateShortUrlMutationDocument = gql`
  mutation ($input: GenerateShortUrlInput!) {
    generateShortUrl(input: $input) {
      id
      shortUrl
      longUrl
    }
  }
`;
