import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Search = ({isScrolled}) => {
    const[movieData,setMovieData] = useState([])
    const {search} = useParams()
    useEffect(() => {
        const fetchSearch = async() => {
            const movies = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${search}&api_key=3d39d6bfe362592e6aa293f01fbcf9b9`)
            setMovieData(movies.data.results)
        }
        fetchSearch()
    },[search])
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h2>Search - {search}</h2> 
        <div className="grid flex">
          {movieData.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                search={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .content {
    margin: auto;
    padding: 0 4rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
export default Search