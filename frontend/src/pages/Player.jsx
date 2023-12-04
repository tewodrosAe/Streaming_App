import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate} from "react-router-dom";
import {BsArrowLeft} from 'react-icons/bs'

export default function Player() {
  const location = useLocation();
  const navigate = useNavigate()
  const id = location.state?.id;
  const type = location.state?.type;
  return (
    <Container>
      <div className="player">
        { !id ?  
        <>
          <div className="back">
            <BsArrowLeft onClick={() => navigate(-1)} />
          </div>
          <video autoPlay controls>
            <source src="https://s1.secunduscdn.xyz/prime/JujutsuKaisenSS2/Jujutsu Kaisen S2 - 01.mp4"/>
          </video>
        </>
        :
        <iframe src={`https://vidsrc.to/embed/${type === 'tv' ? 'tv':'movie'}/${id}`} title="yo" allowFullScreen/>
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  position:relative;
  .player {
    display:flex;
    justify-content: center;
    height:100vh;
    width: 100vw;
    .back {
      position: absolute;
      left:0;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    iframe {
      border-left: black 1px solid;
      border-right: black 1px solid;
      height:100%;
      width: 100%;
      object-fit: cover;
    }
    video {
      margin:auto;
      border-left: black 1px solid;
      border-right: black 1px solid;
      height:80%;
      width: 80%;
      object-fit: cover;
    }
  }
`;
