import React, { ReactElement } from "react";
import Button from "../../Button";
import Input from "../../Input";
import { Formik } from "formik";
import type { UrlShortenerFormValues } from "./types";

interface Props {
  onSubmit: (longUrl: string) => void;
}

const ShortenUrlForm = ({ onSubmit }: Props): ReactElement => {
  const initialValues: UrlShortenerFormValues = { longUrl: "" };
  const handleClick = ({ longUrl }: UrlShortenerFormValues): void => {
    onSubmit(longUrl);
  };

  const styles = {
    form: { display: "flex" },
  };

  return (
    <div style={styles.form}>
      <Formik initialValues={initialValues} onSubmit={handleClick}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name="longUrl"
              value={values.longUrl}
              onChange={handleChange}
            />
            <Button type="submit">Atomify!</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ShortenUrlForm;
