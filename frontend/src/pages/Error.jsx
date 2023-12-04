import React from 'react'
import styled from 'styled-components'
import { VscDebugDisconnect } from "react-icons/vsc";

const Error = () => {
  return (
    <Container>
        <h1>
            Page Doesn't Exist :(
        </h1>
        <VscDebugDisconnect size={70}/>
    </Container>
  )
}

export default Error

const Container = styled.div `
    display:flex;
    flex-direction:column;
    justify-content:center;
    height:100vh;
    width:100vw;
    align-items:center;
    background: #000020;
    font-size:clamp(20px,10vw,30px);
`