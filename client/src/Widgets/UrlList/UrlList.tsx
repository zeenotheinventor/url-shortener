import React, { ReactElement, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { GetUrlsQueryDocument, Url } from "./graphql";

import QueryHandler from "../../Components/QueryHandler";

const UrlList = (): ReactElement => {
  const { loading, error, data } = useQuery(GetUrlsQueryDocument);
  const renderUrl = ({ longUrl, shortUrl }: Url, id: number): ReactNode => {
    return (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{longUrl}</td>
        <td>{shortUrl}</td>
      </tr>
    );
  };

  return (
    <QueryHandler data={data?.urls} error={!!error} loading={loading}>
      {(urls: Url[]): ReactElement => {
        return (
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Long URL</th>
                <th>Short URL</th>
              </tr>
            </thead>

            <tbody>{urls.map(renderUrl)}</tbody>
          </table>
        );
      }}
    </QueryHandler>
  );
};

export default UrlList;