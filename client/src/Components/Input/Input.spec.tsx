import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Input from ".";

describe("Input", () => {
  const subject = (propOverrides = {}) => {
    return render(
      <Input
        name="testInput"
        value=""
        onChange={(e: React.ChangeEvent<any>) => {}}
        {...propOverrides}
      />
    );
  };
  it("renders the input", () => {
    const { getByTestId } = subject();

    const input: HTMLElement = getByTestId("input");

    expect(input).toBeDefined();
  });

  it("initializes the input with expected value", () => {
    const { getByTestId } = subject({ value: "hi im an input" });
    const input: HTMLElement = getByTestId("input");
    expect(input).toHaveAttribute("value", "hi im an input");
  });

  it("initializes the input with placeholder", () => {
    const placeholder: string = "enter a value";
    const { getByTestId } = subject({ placeholder });

    const input: HTMLElement = getByTestId("input");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("calls onChange", () => {
    const onChange = jest.fn();
    const { getByTestId } = subject({ value: "123", onChange });
    const input: HTMLElement = getByTestId("input");

    const newValue = "456";
    fireEvent.change(input, { target: { value: newValue } });
    expect(onChange).toBeCalled();
  });
});
