import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button from ".";

const subject = (overrideProps = {}) => {
  return render(<Button {...overrideProps}>{"Button Text"}</Button>);
};

describe("Button", () => {
  it("renders the children", () => {
    const { queryByText } = subject();

    expect(queryByText("Button Text")).not.toBeNull();
  });

  it("triggers onclick callback when clicked", () => {
    const onClick = jest.fn();

    const { getByTestId } = subject({ onClick });
    const button = getByTestId("button");

    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
