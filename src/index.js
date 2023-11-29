import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRaiting from "./StarRaiting";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <StarRaiting maxRating={10} />
    <StarRaiting />
  </React.StrictMode>
);
