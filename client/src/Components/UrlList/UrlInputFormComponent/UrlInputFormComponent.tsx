import React, { ReactElement } from "react";
import Button from "../../Button";
import Input from "../../Input";

interface Props {
  onSubmit?: () => void;
}

const ShortenUrlForm = ({ onSubmit }: Props): ReactElement => {
  const handleClick = (): void => {
    // call api
    // show success/error message
    onSubmit?.();
  };

  const styles = {
    form: { display: "flex" },
  };
  return (
    <div style={styles.form}>
      <Input /> <Button onClick={handleClick}>Atomify!</Button>
    </div>
  );
};

export default ShortenUrlForm;
