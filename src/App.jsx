import React, { useEffect, useState } from "react";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import { MdOutlineSwapVert } from "react-icons/md";
import CurrencyFlag from "react-currency-flags";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [flags1, setFlags1] = useState("");
  const [flags2, setFlags2] = useState("");

  useEffect(() => {
    setFlags1(from);
    setFlags2(to);
  }, [from, to]);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount("");
  };

  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  return (
    <>
      <div className="bg-[url(https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-no-repeat bg-cover bg-center flex items-center justify-center w-full h-screen">
        <div className="max-w-md px-4 py-3 border border-white rounded-lg backdrop-blur-sm bg-opacity-70 max-h-max">
          <h1 className="text-3xl font-medium text-black ">
            Currency Converter
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="flex px-3 py-2 mt-3 bg-white rounded-lg">
              <div>
                <p className="w-full mb-2 text-black/60">From</p>
                <input
                  type="number"
                  className="outline-none w-full rounded-lg bg-transparent py-1.5 px-2"
                  name="amount"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <p className="mb-2 text-black/60">Currency Type</p>
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-lg">
                  <CurrencyFlag currency={flags1} size="md" />
                  <select
                    className="w-20 bg-gray-200 outline-none cursor-pointer "
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    {options.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="relative w-full cursor-pointer top-0.5 h-1.5">
              <MdOutlineSwapVert
                className="absolute text-3xl text-black -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-md hover:bg-gray-500 left-1/2"
                onClick={swap}
              />
            </div>
            <div className="flex px-3 py-2 mb-3 bg-white rounded-lg">
              <div>
                <p className="w-full mb-2 text-black/60">To</p>
                <input
                  type="number"
                  className="outline-none w-full rounded-lg bg-transparent py-1.5 px-2"
                  name="amount"
                  placeholder="Amount"
                  value={convertedAmount}
                  disabled
                />
              </div>

              <div>
                <p className="w-full mb-2 text-black/50">Currency Type</p>
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-lg">
                  <CurrencyFlag currency={flags2} size="md" />
                  <select
                    className="w-20 bg-gray-200 outline-none cursor-pointer "
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    {options.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-800"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
