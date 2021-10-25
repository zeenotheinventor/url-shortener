import React, { ReactElement } from "react";
import Button from "../../Button";
import Input from "../../Input";
import { Formik, Form } from "formik";
import type { UrlShortenerFormValues } from "./types";
import css from "./UrlShortenerForm.module.css";

interface Props {
  onSubmit: (longUrl: string) => void;
}

const UrlShortenerForm = ({ onSubmit }: Props): ReactElement => {
  const initialValues: UrlShortenerFormValues = { longUrl: "" };
  const handleClick = ({ longUrl }: UrlShortenerFormValues): void => {
    onSubmit(longUrl);
  };

  const styles = {
    form: { display: "flex" },
    marginBottom: "20px",
    marginTop: "20px",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleClick}>
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styles.form}>
            <Input
              name="longUrl"
              value={values.longUrl}
              onChange={handleChange}
            />
            <Button type="submit">Atomify!</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UrlShortenerForm;
