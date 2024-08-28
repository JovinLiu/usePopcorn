import {useEffect} from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      document.addEventListener("keydown", callback);

      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
          // setSelectedId(undefined);
        }
      }
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}
