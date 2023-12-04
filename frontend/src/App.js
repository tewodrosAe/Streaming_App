import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Showey from "./pages/Showey";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import Search from "./pages/Search";
import { useDispatch } from "react-redux";
import { getList } from "./store";
import Error from "./pages/Error";


export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getList())
  },[dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/search/:search" element={<Search isScrolled={isScrolled}/>} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/" element={<Showey setIsScrolled={setIsScrolled} isScrolled={isScrolled}/>} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
