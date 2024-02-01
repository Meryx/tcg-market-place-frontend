import React, { useState, useEffect } from "react";
import {
  makeStyles,
  shorthands,
  Field,
  Input,
  Button,
} from "@fluentui/react-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmail } from "../features/user/userSlice"; // Adjust the import path according to your file structure

import { useNavigate, NavLink } from "react-router-dom";

const API_URL = process.env.API_URL;

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
    width: "100%",
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
  link: {
    ...shorthands.textDecoration("none"),
    color: "#0078d4",
  },
});

const submit = async (dispatch, email, password, navigate) => {
  const payload = { email, password };
  try {
    const response = await axios.post(`${API_URL}/auth/login`, payload);
    const {
      data: { message },
    } = response;
    console.log(message);
    localStorage.setItem("token", response.data.JWT);
    const token = localStorage.getItem("token");
    const userInfoReponse = await axios.get(`${API_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { email } = userInfoReponse.data;
    dispatch(setEmail(email));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.heading}>Sign in to TCGStore</div>
        <div className={styles.fieldContainer}>
          <Field label="Email" className={styles.field}>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              size="large"
            />
          </Field>
        </div>
        <div className={styles.fieldContainer}>
          <Field label="Password" className={styles.field}>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              size="large"
            />
          </Field>
          <div>Forgot Password?</div>
        </div>
        <Button
          appearance="primary"
          size="large"
          className={styles.createAccountButton}
          onClick={() => submit(dispatch, email, password, navigate)}
        >
          Sign In
        </Button>
        <div className={styles.signinContainer}>
          <div>Don't have an account yet?</div>
          <div>
            <NavLink className={styles.link} to="/signup">
              Make one here
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
