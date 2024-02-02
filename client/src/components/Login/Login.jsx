import React, { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../../apis/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../../assets/images/RegisterImage.png";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    //console.log(loginData)
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("please enter correct details");
      return;
    }
    const response = await loginUser({ ...loginData });
    //console.log(response.data)
    localStorage.setItem("name", JSON.stringify(response.data.name));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const redirectToSignUp = () => {
    navigate("/register");
  };

  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <h1 className={styles.heading}>Already have an account?</h1>
        <p>Your personal job finder is here</p>
        <form action="" className={styles.registerForm}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <br />
          <button className={styles.signIn} onClick={handleSignUp}>
            Sign in
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className={styles.signUp} onClick={redirectToSignUp}>
            Sign Up
          </span>
        </p>
      </div>
      <div className={styles.right}>
        <img src={image1} style={{ height: "100vh", width: "40vw" }} />
        <ToastContainer />
        <p>Your Personal Job Finder</p>
      </div>
    </div>
  );
}
