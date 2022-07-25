import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);
  return <div className="App"></div>;
}

export default App;
