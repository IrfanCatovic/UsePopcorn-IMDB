import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue); //moramo da parsamo jer u database ga cuvamo kao string, a sad ga ne razume bez toga
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value)); //ovde nam ne treba niz jer cemo da ubacujemo film u list kada god se WATCHED update
    },
    [value, key]
  );

  return [value, setValue];
}
