import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Context } from "./contexts/CountProvider";
import GoodButton from "../Components/GoodButton";
import BadButton from "../Components/BadButton"
function App() {
  const { good, bad } = useContext(Context);
  return (
    <div>
      <span>
        <ul>
          <li>
          
            <p> nombre de good : {good} </p> <GoodButton />{" "}
          </li>
          <li> 
           <p> nombre de bad : {bad} </p> <BadButton/> 
          </li>
        </ul>
      </span>
    </div>
  );
}

export default App;
