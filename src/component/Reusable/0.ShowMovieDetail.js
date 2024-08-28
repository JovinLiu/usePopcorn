export function ShowMovieDetail({movie}) {
  return (
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{Number.parseInt(movie.runtime)} mins</span>
      </p>
    </div>
  );
}
