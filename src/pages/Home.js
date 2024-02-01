import React, { useEffect, useState } from "react";
import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../features/user/userSlice";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  button: {
    marginBottom: "24px",
  },
});

const API_URL = process.env.API_URL;

const fetchInfo = async (dispatch) => {
  const token = localStorage.getItem("token");
  const userInfoReponse = await axios.get(`${API_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { email } = userInfoReponse.data;
  dispatch(setEmail(email));
};

const Home = () => {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedin(true);
    }
    fetchInfo(dispatch);
  }, []);
  const [loggedin, setLoggedin] = useState(false);
  //   const [email, setEmail] = useState("");
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <>
      {!loggedin ? (
        <div className={styles.container}>
          <Button
            appearance="primary"
            size="large"
            onClick={() => navigate("/signup")}
            className={styles.button}
          >
            Signup
          </Button>
          <Button
            appearance="primary"
            size="large"
            onClick={() => navigate("/login")}
            className={styles.button}
          >
            Login
          </Button>
        </div>
      ) : (
        <div>
          <Button
            appearance="primary"
            size="large"
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedin(false);
            }}
            className={styles.button}
          >
            Log out
          </Button>
          <div>Hello {email}</div>
        </div>
      )}
    </>
  );
};

export default Home;
