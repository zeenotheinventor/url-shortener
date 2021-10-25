import React, { FC } from "react";
import styles from "./Button.module.css";

interface Props {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: FC<Props> = ({ children, ...rest }) => {
  return (
    <button data-testid="button" className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
