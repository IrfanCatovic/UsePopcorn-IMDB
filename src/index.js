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
    <StarRaiting
      maxRating={5}
      messages={["Bad", "Not Bad", "Good", "Great", "Amazing"]}
    />
    <StarRaiting size={24} color="red" className="test" />
  </React.StrictMode>
);
