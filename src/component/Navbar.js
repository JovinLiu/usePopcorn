import {useRef} from "react";
import {useKey} from "./CustomHooks/useKey";

export function Navbar({children}) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function Search({query, setQuery}) {
  const inputEl = useRef(null);

  useKey("Enter", callback);

  function callback() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }

  //下面这段代码，被放进useKey中了
  /*
  useEffect(
    function () {
      document.addEventListener("keydown", callback);

      function callback(e) {
        if (document.activeElement === inputEl.current) return;
        if (!inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );
  */

  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} ref={inputEl} />;
}

export function NumResults({movies}) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}
