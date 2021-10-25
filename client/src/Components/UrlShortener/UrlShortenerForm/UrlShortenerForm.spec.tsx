import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime/runtime";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import UrlShortenerForm from ".";

describe("UrlShortenerForm", () => {
  const subject = (propOverrides = {}) => {
    return render(<UrlShortenerForm onSubmit={(longUrl: string) => {}} {...propOverrides} />);
  };
  it("renders form", () => {
    const { getByTestId } = subject();

    const submitButton: HTMLElement = getByTestId("atomify-button");
    const inputField: HTMLElement = getByTestId("url-field");

    expect(submitButton).toBeDefined();
    expect(inputField).toBeDefined();
  });

  describe("when url is valid", () => {
    it("submits form on click", async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = subject({ onSubmit });

      const input: HTMLElement = getByTestId("url-field");
      const submitButton: HTMLElement = getByTestId("atomify-button");

      const validValue: string = "https://www.primarybid.com";

      fireEvent.change(input, { target: { value: validValue } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).toBeCalledWith(validValue);
      });
    });
  });

  describe("when url is invalid", () => {
    it("does not submit form", async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = subject({ onSubmit });

      const input: HTMLElement = getByTestId("url-field");
      const submitButton: HTMLElement = getByTestId("atomify-button");

      const invalidValue: string = "www.primarybid.com";

      fireEvent.change(input, { target: { value: invalidValue } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).not.toBeCalled();
      });
    });
  });
});
