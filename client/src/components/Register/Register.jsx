import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import image1 from "../../assets/images/RegisterImage.png";
import { registerUser } from "../../apis/auth";
export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.name || !data.email || !data.mobile || !data.password) {
      alert("please fill all details");
      return;
    }
    const response = await registerUser({ ...data });
    //console.log(response)
    //console.log(response.data.message)
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("name", JSON.stringify(response.data.name));
    //console.log(response.data.token)
    //console.log(response.data.name)
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const redirectToSignIn = () => {
    navigate("/login");
  };
  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <h1 className={styles.heading}>Create an account</h1>
        <p>Your personal job finder is here</p>
        <form action="" className={styles.registerForm}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Number"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <br />
          <label className={styles.check}>
            <input type="checkbox" required />
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
          <br />
          <button className={styles.create} onClick={handleSubmit}>
            Create Account
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span className={styles.signUp} onClick={redirectToSignIn}>
            Sign In
          </span>
        </p>
      </div>
      <div className={styles.right}>
        <ToastContainer />
        <img src={image1} style={{ height: "100vh", width: "40vw" }} />
        <p>Your Personal Job Finder</p>
      </div>
    </div>
  );
}
