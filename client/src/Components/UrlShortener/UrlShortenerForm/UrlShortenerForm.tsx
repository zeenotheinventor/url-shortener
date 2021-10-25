import React, { ReactElement } from "react";
import Button from "../../Button";
import Input from "../../Input";
import { Formik, Form } from "formik";
import type { UrlShortenerFormValues } from "./types";

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
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleClick}>
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styles.form}>
            <Input
              data-testid="url-field"
              name="longUrl"
              value={values.longUrl}
              placeholder="enter url starting with https://"
              onChange={handleChange}
            />
            <Button type="submit" data-testid="atomify-button">
              Atomify!
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UrlShortenerForm;
