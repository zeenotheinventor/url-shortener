import { ReactElement } from "react";
import logo from "../../logo.svg";

const Header = (): ReactElement => {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <span className="App-title">Atomizer</span>
    </>
  );
};

export default Header;
