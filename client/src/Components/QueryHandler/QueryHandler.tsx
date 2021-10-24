import React, { ReactElement, ReactNode } from "react";

interface Props<T> {
  children: (result: T) => ReactElement;
  data: T;
  error: boolean;
  loading: boolean;
  noResultsComponent?: ReactNode;
  errorComponent?: ReactNode;
  loadingComponent?: ReactNode;
}

const QueryHandler = <T extends {}>(props: Props<T>) => {
  const {
    children,
    loading,
    error,
    data,
    noResultsComponent: noResults = <p>No results found.</p>,
    loadingComponent = <p>Loading...</p>,
    errorComponent = <p>Something went wrong. Please try again later.</p>,
  } = props;

  const isEmpty: boolean = !data || (Array.isArray(data) && !data.length);

  if (!data && loading) return <>{loadingComponent}</>;
  if (error) return <>{errorComponent}</>;
  if (isEmpty) return <>{noResults}</>;

  return children(data);
};

export default QueryHandler;
