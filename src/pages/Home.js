import React, { useEffect, useState } from "react";
import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";

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

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedin(true);
    }
  }, []);
  const [loggedin, setLoggedin] = useState(false);
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
        </div>
      )}
    </>
  );
};

export default Home;
