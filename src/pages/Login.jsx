import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/")
          console.log(user);
          console.log(userCredential);
          // ...
        })
        .catch((error) => {
          setError(true);
        });
     }catch (err) {
      setError(true);
    }
  }
  
    return (
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat App</span>
          <span className="title">Login</span>

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>Sign in</button>
            {error && <span>Something went wrong</span>}
          </form>

          <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    );
};
export default Login;
