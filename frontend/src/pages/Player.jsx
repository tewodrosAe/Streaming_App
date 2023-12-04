import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
/* import video from "../assets/video.mp4"; */

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const type = location.state?.type;
  console.log(type)
  return (
    <Container>
      <div className="player">
        {/* <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div> */}
        <iframe src={`https://vidsrc.to/embed/${type === 'tv' ? 'tv':'movie'}/${id}`} title="yo"autoPlay loop controls muted />
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
      top:35%;
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
  }
`;
