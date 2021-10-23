export const generateShortUrlDocument: string = `
mutation ($input: GenerateShortUrlInput!){
    generateShortUrl(input: $input){
      shortUrl
      longUrl
    }
  }
`;

export const getUrlsDocument: string = `
  query{
    urls{
      longUrl
    }
  }
`;
