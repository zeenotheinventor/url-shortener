export const generateShortUrlDocument: string = `
mutation ($input: GenerateShortUrlInput!){
    generateShortUrl(input: $input){
      id
      shortUrl
      longUrl
    }
  }
`;

export const getUrlsDocument: string = `
  query{
    urls{
      id
      longUrl
      shortUrl
    }
  }
`;
