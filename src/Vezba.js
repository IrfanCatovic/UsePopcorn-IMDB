import { useState } from "react";

export default function Vezba() {
  const [listZadatak, setListZadatak] = useState([]);
  const [noviZadatak, setNoviZadatak] = useState("");

  function handleZadatak(noviZadatak) {
    setListZadatak([...listZadatak, noviZadatak]);
    setNoviZadatak("");
  }

  return (
    <div>
      <input
        placeholder={noviZadatak === "" ? "Upisi novi zadatak" : noviZadatak}
        value={noviZadatak}
        onChange={(e) => setNoviZadatak(e.target.value)}
      />
      <button onClick={() => handleZadatak(noviZadatak)}>Dodaj!</button>
      <ul> {listZadatak && listZadatak.map((p, i) => <li key={i}>{p}</li>)}</ul>
    </div>
  );
}
