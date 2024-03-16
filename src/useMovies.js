import { useState, useEffect } from "react";

const KEY = "100db50b";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController(); //browser API

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(""); //Da nemamo ovo na pocetku bi pisalo da nema pronadjenih filmova

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } //da povezemo sa fetchom controller
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found ❌");
          //ovaj error ce baciti kada ne moze da nadje film sa tim nazivom i da ne bi srusilo app, bacice ovaj error

          setMovies(data.Search);
          // .then((res) => res.json())
          // .then((data) => setMovies(data.Search));
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          //ovo se cita kad a je error i prskoci ceo ostatak koda u try bloku kada bacimo gresku
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
        //ovo je napravljeno da ne trazi filmove ispod 3 slova i da ne prijavljuje gresku
      }

      //   handleCloseMovie(); //kada imamo otvoren film i pisemo novi u pretragu pre nego sto
      //fetchuje novu listu filmova, ovaj prosli ce da iskljuci
      fetchMovies();

      return function () {
        controller.abort(); // da bismo zaustavili previse http req na stranici, dok npr pretrazujemo da nam ne stize previse odgovora
        //kada god unosimo novo slovo u pretragu on onaj prosli http req zaustavlja i otpocinje novi
        //tako funkcionise sve dok se ne zaustavimo kod poslednjeg
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
