import React from "react";
import { render, RenderResult } from "@testing-library/react";
import QueryHandler from ".";
import "@testing-library/jest-dom/extend-expect";

const data = {
  message: "Hello! I am generic query response data",
};

const subject = (customProps = {}) => {
  const defaultProps = {
    data: data.message,
    error: false,
    loading: false,
  };

  return render(
    <QueryHandler {...defaultProps} {...customProps}>
      {(queryResult) => <>{queryResult}</>}
    </QueryHandler>
  );
};

describe("QueryHandler", () => {
  it("renders children components", () => {
    const { container }: RenderResult = subject();

    expect(container).toHaveTextContent(
      "Hello! I am generic query response data"
    );
  });

  it("renders loading component when it is loading and no data", () => {
    const { container }: RenderResult = subject({
      loading: true,
      data: undefined,
    });

    expect(container).toHaveTextContent("Loading...");
  });

  it("does not render loading component when is loading but has data", () => {
    const { container }: RenderResult = subject({
      loading: true,
      data: data.message,
    });

    expect(container).not.toHaveTextContent("Loading...");
  });

  it("renders custom loading component when is loading, no data and receives loading component", () => {
    const { container }: RenderResult = subject({
      loading: true,
      data: undefined,
      loadingComponent: <>Custom Loading</>,
    });

    expect(container).toHaveTextContent("Custom Loading");
  });

  it("renders error when there is an error", () => {
    const { container }: RenderResult = subject({ error: true });

    expect(container).toHaveTextContent(
      "Something went wrong. Please try again later."
    );
  });

  it("renders custom error component when there is an error", () => {
    const { container }: RenderResult = subject({
      data: undefined,
      error: true,
      errorComponent: <>Custom Error</>,
    });

    expect(container).toHaveTextContent("Custom Error");
  });

  it("renders no results when there is no data", () => {
    const { container }: RenderResult = subject({ data: undefined });

    expect(container).toHaveTextContent("No results found.");
  });

  it("renders custom no results message when there is no data", () => {
    const { container }: RenderResult = subject({
      data: [],
      noResultsComponent: <>Custom no Results</>,
    });

    expect(container).toHaveTextContent("Custom no Results");
  });
});
