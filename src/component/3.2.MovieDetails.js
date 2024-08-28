import {useEffect, useRef} from "react";
import {AddToList} from "./Reusable/0.AddToList";
import {useKey} from "./CustomHooks/useKey";

export function MovieDetails({setSelectedId, selectedMovie, rating, setRating, selectedId, watched, setWatched}) {
  const countRef = useRef(1);

  const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = selectedMovie;

  const movie = {imdbID: selectedId, Title: title, Year: year, Poster: poster, runtime: runtime, imdbRating: imdbRating, userRating: rating, countRatingDecisions: countRef.current};

  useEffect(
    function () {
      if (rating) countRef.current++;
    },
    [rating]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKey("escape", setSelectedId);

  //下面这段代码，被放进useMovies中了
  /*
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          setSelectedId(undefined);
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setSelectedId]
  );
  */

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => setSelectedId(null)}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${selectedMovie.Title}`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      <div className="rating">
        <AddToList movie={movie} watched={watched} setWatched={setWatched} rating={rating} setRating={setRating} selectedId={selectedId} setSelectedId={setSelectedId} />
      </div>
      <section>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed By {director}</p>
      </section>
    </div>
  );
}
