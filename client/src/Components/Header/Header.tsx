import { ReactElement } from "react";
import logo from "../../logo.svg";
import styles from "./Header.module.css";

const Header = (): ReactElement => {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <span className={styles.title}>Atomizer</span>
    </div>
  );
};

export default Header;
