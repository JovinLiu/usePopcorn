import {ShowList} from "./Reusable/0.ShowList";
import {ShowPlusButton} from "./Reusable/0.ShowPlusButton";
import {useState} from "react";

export function SearchBox({movies, setSelectedId, selectedId, setSelectedMovie, setRating, setIsDetailLoading}) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <>
      <ShowPlusButton setIsOpen={setIsOpen1} isOpen={isOpen1} />
      {isOpen1 && <ShowList movies={movies} selectedId={selectedId} setSelectedId={setSelectedId} setSelectedMovie={setSelectedMovie} setRating={setRating} setIsDetailLoading={setIsDetailLoading} />}
    </>
  );
}
