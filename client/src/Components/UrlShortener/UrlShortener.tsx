import React, { ReactElement, ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GenerateShortUrlMutationDocument, GetUrlsQueryDocument, Url } from "./graphql";

import QueryHandler from "../QueryHandler";
import UrlShortenerForm from "./UrlShortenerForm";
import { toast } from "react-toastify";
import styles from "./UrlShortener.module.css";

const UrlShortener = (): ReactElement => {
  const { loading, error, data, refetch } = useQuery(GetUrlsQueryDocument);
  const renderUrl = ({ longUrl, shortUrl }: Url, id: number): ReactNode => {
    return (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{longUrl}</td>
        <td>{shortUrl}</td>
      </tr>
    );
  };

  const [generateShortUrl] = useMutation(GenerateShortUrlMutationDocument);

  const submitShortenerForm = async (longUrl: string): Promise<void> => {
    try {
      await generateShortUrl({
        variables: {
          input: {
            longUrl,
          },
        },
      });
      toast.success("Success!");
      refetch();
    } catch (e: any) {
      toast.error("Invalid input. Please ensure URL is in format 'http://url.domain'");
    }
  };

  return (
    <>
      <UrlShortenerForm onSubmit={submitShortenerForm} />
      <QueryHandler data={data?.urls} error={!!error} loading={loading}>
        {(urls: Url[]): ReactElement => {
          return (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Index</th>
                  <th className={styles.longUrlCol}>Long URL</th>
                  <th>Short URL</th>
                </tr>
              </thead>

              <tbody>{urls.map(renderUrl)}</tbody>
            </table>
          );
        }}
      </QueryHandler>
    </>
  );
};

export default UrlShortener;
