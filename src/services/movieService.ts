import axios from "axios";
import { Movie } from "../types/movie";

const myApiKey = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.headers.common["Authorization"] = `Bearer ${myApiKey}`;

export interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(`https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=1`);
  return response.data.results;
};
