import React from "react";
import Header from ".";
import { render } from "@testing-library/react";

describe("Header", () => {
  const subject = () => {
    return render(<Header />);
  };

  it("renders logo", () => {
    const { getByTestId } = subject();
    const logo: HTMLElement = getByTestId("logo");
    expect(logo).toBeDefined();
  });

  it("renders title", () => {
    const { getByTestId } = subject();
    const title: HTMLElement = getByTestId("title");
    expect(title).toBeDefined();
  });
});
