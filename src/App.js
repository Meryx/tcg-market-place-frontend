import React, { useState, useEffect } from "react";
import {
  makeStyles,
  shorthands,
  Field,
  Input,
  Button,
} from "@fluentui/react-components";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    ...shorthands.margin("24px", "24px", "0"),
    "@media (min-width: 768px)": {
      width: "360px",
      justifyContent: "center",
    },
  },
  heading: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "24px",
  },
  field: {
    fontWeight: "bold",
  },
  fieldContainer: {
    marginBottom: "24px",
  },
  signinContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  createAccountButton: {
    marginBottom: "24px",
  },
});
const App = () => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = () => {
    axios
      .post("http://localhost:8000/api/auth/register", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.heading}>Create an Account</div>
        <div className={styles.fieldContainer}>
          <Field
            label="Email"
            validationState="success"
            validationMessage="This email is available."
            className={styles.field}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              size="large"
            />
          </Field>
          <div>We'll send a confirmation email after signup.</div>
        </div>
        <div className={styles.fieldContainer}>
          <Field
            label="Password"
            hint="At least 8 characters: 1 number, 1 uppercase, 1 lowercase, and 1 special character."
            className={styles.field}
          >
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              size="large"
            />
          </Field>
        </div>
        <Button
          appearance="primary"
          size="large"
          className={styles.createAccountButton}
          onClick={submit}
        >
          Create Account
        </Button>
        <div className={styles.signinContainer}>
          <div>Already have an Account?</div>
          <div>Sign in</div>
        </div>
      </div>
    </div>
  );
};

export default App;
