import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import Button from ".";

const subject = (overrideProps = {}) => {
  return render(<Button {...overrideProps}>{"Button Text"}</Button>);
};

describe("Button", () => {
  it("renders the children", () => {
    const { queryByText }: RenderResult = subject();

    expect(queryByText("Button Text")).not.toBeNull();
  });

  it("triggers onclick callback when clicked", () => {
    const onClick = jest.fn();

    const { getByTestId }: RenderResult = subject({ onClick });
    const button = getByTestId("button");

    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
