export default function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {/* Ovaj Id nalazimo tako sto ispisemo u console neki od ovih objekata i vidimo sta sve ima u njemu
    tu cemo da nadjemo kako su oni nazvali taj id koji cemo mi da koristimo */}
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
