import React, { ReactElement } from "react";
import styles from "./Input.module.css";

interface Props {
  className?: string;
  disabled?: boolean;
}

const Input = ({ ...rest }: Props): ReactElement => {
  return (
    <input data-testid="input" className={styles.input} type="text" {...rest} />
  );
};

export default Input;
