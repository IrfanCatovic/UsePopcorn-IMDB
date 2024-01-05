import { useState, useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback); //moramo da cistimo da se ne bi dodavali evenListener svaki pud kada zatvorimo film
      };
    },
    [action, key]
  );
}
