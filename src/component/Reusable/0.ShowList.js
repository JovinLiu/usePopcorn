import {ShowMovieDetail} from "./0.ShowMovieDetail";
import {ShowYear} from "./0.ShowYear";
import {ShowImageAndTitle} from "./0.ShowImageAndTitle";
import {useEffect} from "react";

const KEY = "9d7af29e";

export function ShowList({movies, setWatched, selectedId, setSelectedId, setSelectedMovie, setRating, setIsDetailLoading}) {
  useEffect(
    function () {
      async function getMovieDetail() {
        setIsDetailLoading(true);
        if (!selectedId) return;
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data = await res.json();
        setSelectedMovie(data);
        setIsDetailLoading(false);
      }
      getMovieDetail();
    },
    [selectedId, setIsDetailLoading, setSelectedMovie]
  );

  function setIdAndRating(movie, setRating) {
    setSelectedId(movie.imdbID === selectedId ? null : movie.imdbID);
    setRating("");
  }

  function handleDeleteWatched(movie) {
    setWatched(movies.filter((mov) => mov.imdbID !== movie.imdbID));
  }

  return (
    <ul className="list list-movies boxLeft">
      {movies?.map((movie) => (
        <li
          key={movie.imdbID}
          onClick={() => {
            !movie.userRating && setIdAndRating(movie, setRating);
          }}
        >
          <ShowImageAndTitle movie={movie} />
          <div className="detail-container">
            {movie.userRating ? <ShowMovieDetail movie={movie} /> : <ShowYear movie={movie} />}
            {movie.userRating && (
              <button className="btn-delete" onClick={() => handleDeleteWatched(movie)}>
                X
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
