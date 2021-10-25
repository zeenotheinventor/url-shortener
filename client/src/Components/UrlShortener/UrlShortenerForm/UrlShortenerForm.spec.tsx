import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "@testing-library/react";
import UrlShortenerForm from ".";

describe("UrlShortenerForm", () => {
  const subject = (propOverrides = {}) => {
    return render(
      <UrlShortenerForm onSubmit={(longUrl: string) => {}} {...propOverrides} />
    );
  };
  it("renders form", () => {
    const { getByTestId } = subject();

    const submitButton: HTMLElement = getByTestId("atomify-button");
    const inputField: HTMLElement = getByTestId("url-field");

    expect(submitButton).toBeDefined();
    expect(inputField).toBeDefined();
  });
});
