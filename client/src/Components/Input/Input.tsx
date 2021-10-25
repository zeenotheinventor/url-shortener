import React, { ReactElement } from "react";
import styles from "./Input.module.css";

interface Props {
  name: string;
  value: string;
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const Input = ({ name, ...rest }: Props): ReactElement => {
  return (
    <input
      data-testid="input"
      className={styles.input}
      type="text"
      name={name}
      {...rest}
    />
  );
};

export default Input;
