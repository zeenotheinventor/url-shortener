import React, { FC } from "react";

interface Props {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: FC<Props> = ({ children, ...rest }) => {
  return (
    <button data-testid="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
