import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import { firebaseAuth } from '../utils/firebase-config'
import axios from 'axios'
function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignIn = async () => {
    setError('')
    try {
      const { email, password } = formValues
      const user = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create`,{email})
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      localStorage.setItem('streamer', JSON.stringify(user.data.token))
    } catch (error) {
      setError(error.message.split(' ')[2].replace(/[{()}]/g, '').split('/')[1])
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/')
  })

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {error !== '' && <div className="error"> * {error} * </div>}
          {showPassword && <button onClick={handleSignIn}>Signup</button>}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(255, 255, 255, 0.1),
      rgba(0, 0, 0, 0.7)
    );
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .error {
        color: rgb(200, 10, 50);
        font-size: 0.9rem;
        background:rgba(0,0,0,0.8);
        padding: 4px;
      }
      .text {
        gap: 1rem;
        text-align: center;
        h1 {
          padding: 0 2vw;
          font-size: clamp(40px, 8vw, 3.5rem);
        }
        h4 {
          font-size: clamp(30px, 6vw, 2rem);
          font-weight: 500;
        }
        h6 {
          font-size: clamp(18px, 4vw, 1rem);
          font-weight: 500;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? '1fr 1fr' : '2fr 1fr'};
        @media only screen and (min-width: 700px){
          width: 50%;
        }
        @media only screen and (max-width: 480px){
          display:flex;
          flex-direction:column;
          gap:2vh;
        }
        input {
          color: white;
          padding: 0.8rem;
          background: rgba(0, 0, 0, 0.4);
          font-size: 1rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.3);
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #7a26c1;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #7a26c1;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`

export default Signup
