import React, { ReactElement } from "react";

interface Props {
  className?: string;
  disabled?: boolean;
}

const Input = ({ ...rest }: Props): ReactElement => {
  return <input data-testid="input" type="text" {...rest} />;
};

export default Input;
