import React, { useState } from 'react'
import styles from './Login.module.css'
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "@firebase/auth";
import { auth } from "../../firebase";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [submitBtnDisable, setsubmitBtnDisable] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handelSubmit = async() => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setsubmitBtnDisable(true);

    try {
      const user = await fetchSignInMethodsForEmail(auth, values.email);
      if (!user) {
        setErrorMsg("Please create an account");
        setsubmitBtnDisable(false);
        return;
      }
      signInWithEmailAndPassword(auth, values.email, values.pass) // Correct function call
      .then(() => {
        setsubmitBtnDisable(false);
        navigate("/");
      })
      .catch((error) => {
        setsubmitBtnDisable(false);

        setErrorMsg(error.message);
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMsg("An error occurred. Please try again later.");
      setsubmitBtnDisable(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl label="Email" placeholder="Enter eamil address" onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }/>
        <InputControl type="password" label="Password" placeholder="Enter password" onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }/>
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handelSubmit} disabled={submitBtnDisable}>
            Login
          </button>
          <p>Don't have an account?{" "}<span> <Link to="/signup">Sign Up</Link></span></p>
        </div>
      </div>
    </div>
  )
}

export default Login;