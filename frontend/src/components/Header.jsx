import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo1.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  padding: 0 clamp(10px,3vw,4rem);
  .logo {
    img {
      height: 7rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #7A26C1;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
