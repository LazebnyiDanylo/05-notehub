import "./App.module.css";
import { useState } from "react";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (topic: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      const data = await fetchMovies(topic);
      setMovies(data);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelect = (selectedMovie: Movie) => setSelectedMovie(selectedMovie);
  const modalClose = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={modalClose} />}
    </>
  );
}
