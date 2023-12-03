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

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <iframe src={`https://autoembed.to/${type === 'tv' ? 'tv':'movie'}/tmdb/${id}${type === 'tv' ? '-1-1':''}`} title="yo"autoPlay loop controls muted />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    iframe {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
