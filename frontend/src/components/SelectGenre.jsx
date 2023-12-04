import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";
export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  padding:0.2rem 0.8rem;
  border-radius: 5px;
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.22rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: #ffffff55 1px solid;
  border-bottom: #ffffff15 1px solid;
  option{
    background:black;
  }
`;
