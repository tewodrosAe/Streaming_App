import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../utils";

const API_KEY = process.env.REACT_APP_API_KEY
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  list:{
    liked:[],
    watchlist:[]
  }
};

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+ getToken()}
});

export const getGenres = createAsyncThunk("showey/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3d39d6bfe362592e6aa293f01fbcf9b9"
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        type: movie.media_type,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "showey/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      showey: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres
    );
  }
);
export const fetchMovies = createAsyncThunk(
  "showey/trending",
  async ({ type }, thunkAPI) => {
    const {
      showey: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const removeLikedMovie = createAsyncThunk(
  "showey/deleteLiked",
  async ({ movieId }) => {
    const {
      data: { likedMovies },
    } = await instance.put("/removeliked", {
      id: movieId
    });
    return likedMovies;
  }
);

export const addLikedMovie = createAsyncThunk(
  "showey/addLiked",
  async ({ movieData }) => {
    const {
      data: { likedMovies },
    } = await instance.put("/addliked", {
      data: movieData
    });
    return likedMovies;
  }
);
export const removeWatchList = createAsyncThunk(
  "showey/removeWatch",
  async ({ movieId }) => {
    const {
      data: { watchList },
    } = await instance.put("/removewatch", {
      id: movieId
    });
    return watchList;
  }
);

export const addWatchList = createAsyncThunk(
  "showey/addWatch",
  async ({ movieData }) => {
    const {
      data: { watchList },
    } = await instance.put("/addwatch", {
      data: movieData
    });
    return watchList;
  }
);
export const getList = createAsyncThunk(
  "showey/getList",
  async () => {
    const {
      data: { likedMovies, watchList },
    } = await instance.get("/");
    return {likedMovies,watchList};
  }
);
const ShoweySlice = createSlice({
  name: "Showey",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(addLikedMovie.fulfilled, (state,action) => {
      state.list.liked = action.payload
    })
    builder.addCase(removeLikedMovie.fulfilled, (state,action) => {
      state.list.liked = action.payload
    })
    builder.addCase(addWatchList.fulfilled, (state,action) => {
      state.list.watchlist = action.payload
    })
    builder.addCase(removeWatchList.fulfilled, (state,action) => {
      state.list.watchlist = action.payload
    })
    builder.addCase(getList.fulfilled, (state,action) => {
      state.list.watchlist = action.payload.watchList
      state.list.liked = action.payload.likedMovies
    })
  },
});

export const store = configureStore({
  reducer: {
    showey: ShoweySlice.reducer,
  },
});

export const { setGenres, setMovies } = ShoweySlice.actions;
