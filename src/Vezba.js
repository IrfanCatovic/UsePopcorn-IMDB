import { useState } from "react";

export default function Vezba() {
  const [listZadatak, setListZadatak] = useState([]);
  const [zavrseniZadatak, setZavrseniZadatak] = useState([]);
  const [noviZadatak, setNoviZadatak] = useState("");

  function handleZadatak(noviZadatak) {
    setListZadatak([...listZadatak, { id: Date.now(), text: noviZadatak }]);
    setNoviZadatak("");
  }

  function handleZavrseniZadatak(id) {
    const gotov = listZadatak.find((z) => z.id === id);

    setZavrseniZadatak([...zavrseniZadatak, gotov]);

    setListZadatak(listZadatak.filter((z) => z.id !== id));
  }

  return (
    <div>
      <input
        placeholder={noviZadatak === "" ? "Upisi novi zadatak" : noviZadatak}
        value={noviZadatak}
        onChange={(e) => setNoviZadatak(e.target.value)}
      />
      {noviZadatak && (
        <button onClick={() => handleZadatak(noviZadatak)}>Dodaj!</button>
      )}

      {listZadatak.length > 0 && (
        <ul>
          <h1>Zadaci za uraditi</h1>
          {listZadatak.map((p) => (
            <li style={{ listStyle: "none" }} key={p.id}>
              {
                <Zadatak
                  onDone={() => handleZavrseniZadatak(p.id)}
                  zadatakInfo={p.text}
                />
              }
            </li>
          ))}
        </ul>
      )}

      {zavrseniZadatak.length > 0 && (
        <ul>
          <h1>Završeni zadaci</h1>
          {zavrseniZadatak.map((zz) => (
            <li key={zz.id} style={{ listStyle: "none" }}>
              <h2>{zz.text}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Zadatak({ zadatakInfo, onDone }) {
  return (
    <div>
      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input type="checkbox" onClick={onDone} />
        <h2>{zadatakInfo}</h2>
      </span>
    </div>
  );
}
