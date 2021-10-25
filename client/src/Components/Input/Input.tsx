import React, { ReactElement } from "react";
import styles from "./Input.module.css";

interface Props {
  name: string;
  value: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const Input = ({ name, placeholder, ...rest }: Props): ReactElement => {
  return (
    <input
      data-testid="input"
      className={styles.input}
      type="text"
      name={name}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
