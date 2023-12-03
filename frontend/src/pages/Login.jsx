import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,{email})
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      localStorage.setItem('streamer', JSON.stringify(user.data.token))
    } catch (error) {
      setError(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <form className="form-container flex column a-center" onSubmit={handleLogin}>
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {error !== '' && <div className="error"> * {error} * </div>}
              <button type="submit">Login to your account</button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(0,0,0,0.7),rgba(255,255,255,0.1),rgba(0,0,0,0.7));
    grid-template-rows: 15vh 85vh;
    .form-container {
      margin: 0 2vw;
      gap: 2rem;
      height: 85vh;
      .error {
        color: rgb(200, 10, 50);
        font-size: 0.9rem;
        background:rgba(0,0,0,0.8);
        padding: 4px;
        font-weight: bold;
      }
      .form {
        padding: 4rem;
        padding-bottom:6rem;
        background: rgba(255,255,255,0.2);
        backdrop-filter:blur(4px);
        width: 320px;
        gap: 1rem;
        margin-top:2rem;
        color: white;
        border-radius: 20px;
        .container {
          gap: 1rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            margin-top: 1rem;
            background-color: #7A26C1;
            border: 1px solid rgba(255,255,255,0.3);
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;
