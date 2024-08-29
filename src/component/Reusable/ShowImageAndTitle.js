export function ShowImageAndTitle({movie}) {
  return (
    <>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
    </>
  );
}
