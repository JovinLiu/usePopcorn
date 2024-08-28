import {ShowList} from "./Reusable/0.ShowList";
import {ShowPlusButton} from "./Reusable/0.ShowPlusButton";
import {WatchedStats} from "./3.1.WatchedStats";
import {useState} from "react";

export function WatchedBox({watched, setWatched, setIsDetailLoading, setRating, setSelectedId}) {
  const [isOpen2, setIsOpen2] = useState(true);
  const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = Number(average(watched.map((movie) => movie.imdbRating))).toFixed(2);
  const avgUserRating = Number(average(watched.map((movie) => movie.userRating))).toFixed(2);
  const avgRuntime = Number(average(watched.map((movie) => Number.parseInt(movie.runtime)))).toFixed(2);

  const avg = {
    imdbRating: avgImdbRating,
    runtime: avgRuntime,
    userRating: avgUserRating
  };

  return (
    <>
      <ShowPlusButton setIsOpen={setIsOpen2} isOpen={isOpen2} />
      {isOpen2 && (
        <>
          <WatchedStats watched={watched} avg={avg} />
          <ShowList movies={watched} setWatched={setWatched} setIsDetailLoading={setIsDetailLoading} setRating={setRating} setSelectedId={setSelectedId} />
        </>
      )}
    </>
  );
}
