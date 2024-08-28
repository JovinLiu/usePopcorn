import {ShowMovieDetail} from "./Reusable/0.ShowMovieDetail";

export function WatchedStats({watched, avg}) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <ShowMovieDetail movie={avg} />
      </div>
    </div>
  );
}
