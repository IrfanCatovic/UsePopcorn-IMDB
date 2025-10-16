import { useEffect, useRef, useState } from "react";
import { useKey } from "../useKey";
import Loader from "../App";
import StarRaiting from "../StarRaiting.js";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const KEY = "100db50b";
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current++;
      console.log(countRef);
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  //nadji u gledane filmove film koji smo selektovali
  //uporedjuje selektovani film sa niz gledanih filmova
  // ?.  ako postoji onda je watchedUserRating jedan userRating

  //Ovaj objekat je da registrujemo za listu filmova

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // const isTop = imdbRating > 8;
  // console.log(isTop);

  // const [avgRating, setAvgRating] = useState(0);

  //ovaj objekat je da registrujemo za listu gledanih filmova
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId, //koliko sam razumeo
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)), // razdvajamo jer pise 140 min, na space i uzimamo prvi deo i convert u number
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    // setAvgRating(Number(imdbRating));
    // setAvgRating((x) => (x + userRating) / 2);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //       }
  //     }
  //     document.addEventListener("keydown", callback);

  //     return function () {
  //       document.removeEventListener("keydown", callback); //moramo da cistimo da se ne bi dodavali evenListener svaki pud kada zatvorimo film
  //     };
  //   },
  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);

        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRaiting
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p> You rated this movie {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
