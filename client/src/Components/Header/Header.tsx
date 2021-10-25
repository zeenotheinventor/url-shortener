import React from "react";
import { ReactElement } from "react";
import logo from "../../logo.svg";
import styles from "./Header.module.css";

const Header = (): ReactElement => {
  return (
    <div className={styles.container}>
      <img data-testid="logo" src={logo} className={styles.logo} alt="logo" />
      <span data-testid="title" className={styles.title}>
        Atomizer
      </span>
    </div>
  );
};

export default Header;
