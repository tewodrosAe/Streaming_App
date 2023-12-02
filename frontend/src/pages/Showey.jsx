import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.png";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";
function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.showey.movies);
  const genres = useSelector((state) => state.showey.genres);
  const genresLoaded = useSelector((state) => state.showey.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <a href="https://www.imdb.com/title/tt12343534/" rel="noreferrer" target="_blank">
              <button className="flex j-center a-center">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </a>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`\
background: black;
.hero {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${backgroundImage});
    background-size:cover;
    background-position:center;
    height:100vh;
    width:100vw;
    position: relative;
    img {
      height: 105vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        margin-bottom:-14rem;
        @media only screen and (max-width: 460px){
          margin-bottom:-10rem
        }
        img {
          width: 100%;
          height: 100%;
          margin-left: -1rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        display:flex;
        @media only screen and (max-width: 460px){
          flex-direction: column;
        }
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem 2.5rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          
          }
          a{
            text-decoration:none;
            button {
              background-color: rgba(109, 109, 110, 0.7);
              color: white;
              svg {
                font-size: 1.8rem;
              }
          }
        }
      }
    }
  }
`;
export default Netflix;
