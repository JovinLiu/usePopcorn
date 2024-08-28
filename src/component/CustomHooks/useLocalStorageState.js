import {useEffect, useState} from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function initialization() {
    const storedValue = JSON.parse(localStorage.getItem(key));
    return storedValue ? storedValue : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
