import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CurrencyTask from "./CurrencyTask";
import StarRaiting from "./StarRaiting";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRaiting color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <CurrencyTask /> */}
    {/* <StarRaiting
      maxRating={5}
      messages={["Bad", "Not Bad", "Good", "Great", "Amazing"]}
    />
    <StarRaiting size={24} color="red" className="test" defaultRating={3} /> */}

    {/* <Test /> */}
  </React.StrictMode>
);
