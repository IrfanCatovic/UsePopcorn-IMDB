// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function CurrencyTask() {
  const [input, setInput] = useState(1);
  const [currency, setCurrency] = useState("EUR");
  const [convCurrency, setConvCurrency] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(currency);

  useEffect(
    function () {
      async function getCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${currency}&to=${convCurrency}`
        );
        const data = await res.json();
        setOutput(data.rates[convCurrency]);
        setIsLoading(false);
      }
      if (currency === convCurrency) return setOutput(input);
      getCurrency();
    },
    [input, currency, convCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select
        value={convCurrency}
        onChange={(e) => setConvCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
