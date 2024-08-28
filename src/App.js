import {useState} from "react";
import {Navbar, Logo, Search, NumResults} from "./component/1.Navbar";
import {WatchedBox} from "./component/3.0.WatchedBox";
import {SearchBox} from "./component/2.SearchBox";
import {BoxLeft} from "./component/Reusable/0.BoxLeft";
import {BoxRight} from "./component/Reusable/0.BoxRight";
import {Loader} from "./component/Reusable/0.Loader";
import {Main} from "./component/Reusable/0.Main";
import {MovieDetails} from "./component/3.2.MovieDetails";
import {useMovies} from "./component/CustomHooks/useMovies";
import {useLocalStorageState} from "./component/CustomHooks/useLocalStorageState";
import {ErrorMessage} from "./component/Reusable/0.ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(undefined);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [rating, setRating] = useState();
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const {movies, isLoading, error} = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  //usemovie这段代码就像其他的hook一样，接受一个初始值，返回一些东西

  // console.log([setMovies, setWatched, selected]);

  /* 下面这么写就等于和作用域之外进行交互，会导致无限循环。产生Side effect
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
  useEffect(function () {
    console.log("1.After initial render");
  }, []);
  //这一条没有dependency array所以每次render都被触发
  useEffect(function () {
    console.log("2.After every render");
  });
  //这一条有dependency，所以每次query变化的时候，方程就会被调用
  useEffect(
    function () {
      console.log("3. Use Dependency");
    },
    [query]
  );
  //这里在top level的log和logic render一起执行，所以在council里最先显示
  console.log("4. Before Effect");
*/

  //下面这段代码，被放进useLocalStorageState中了
  /*
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  function initialization() {
    const storedValue = JSON.parse(localStorage.getItem("watched"));
    return storedValue;
  }
  */

  //下面这段代码，被放进useMovies中了
  /*
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          //这里的错误管理就是常规的js操作，可以参考之前JS课程的代码
          setIsLoading(true);
          setError("");

          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});
          // console.log(res);
          if (!res.ok) throw Error("Something went wrong with fetching Movie Data");
          const data = await res.json();
          // console.log(data);
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          //这里log总是出现两次，是因为开发过程中使用的是React.StrictMode。如果在index.js中取消的话，就只log一次
          // console.log(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  */

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <BoxLeft>
          {isLoading && <Loader />}
          {!isLoading && !error && <SearchBox movies={movies} selectedId={selectedId} setSelectedId={setSelectedId} setSelectedMovie={setSelectedMovie} setRating={setRating} setIsDetailLoading={setIsDetailLoading} />}
          {error && <ErrorMessage message={error} />}
        </BoxLeft>
        <BoxRight>{selectedId ? isDetailLoading ? <Loader /> : <MovieDetails selectedId={selectedId} setSelectedId={setSelectedId} selectedMovie={selectedMovie} rating={rating} setRating={setRating} watched={watched} setWatched={setWatched} /> : <WatchedBox setRating={setRating} setSelectedId={setSelectedId} watched={watched} setWatched={setWatched} selectedId={selectedId} setIsDetailLoading={setIsDetailLoading} />}</BoxRight>
      </Main>
    </>
  );
}
