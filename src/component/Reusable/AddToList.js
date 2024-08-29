import {StarRating} from "./StarRating";

//下面StarRating这里设置API
export function AddToList({rating, setRating, setWatched, watched, movie, selectedId, setSelectedId}) {
  function handleAddWatchedMovie() {
    if (watched.some((mov) => mov.imdbID === movie.imdbID)) return;
    setWatched([...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    setSelectedId(undefined);
  }

  const previousRating = watched.filter((mov) => mov.imdbID === selectedId)[0]?.userRating;

  return (
    <div className="add-to-list-box">
      {previousRating ? <span className="previousRating">{`You have rated ${previousRating}⭐️ for this movie`}</span> : <StarRating maxRating={10} color={"#fcc419"} size={20} rating={rating} setRating={setRating} />}
      {rating && (
        <button className="btn-add" onClick={() => rating && handleAddWatchedMovie()}>
          + ADD TO LIST
        </button>
      )}
    </div>
  );
}
