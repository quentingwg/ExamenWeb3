import React from "react";
import { useState } from "react";


const Context = React.createContext({
    good:Number,
        ok:Number,
        bad: Number,
        increaseGood: ()=> {},
        increaseOk: () => {},
        increaseBad:() => {},
        decreaseBad: () => {}
});


const ProviderWrapper = (props) => {
    const [good, setGood] = useState(0);
    const [ok, setOK] = useState(0);
    const [bad, setBad] = useState(0);

    const increaseGood= () => {setGood(good+1)}
    const increaseOk= () => {setOk(ok+1)}
    const increaseBad= () => {setBad(bad+1)}
    const decreaseBad= () => {setBad(bad-1)}





    return (<Context.Provider >
        {props.children}
        </Context.Provider> )



}

export {Context,  ProviderWrapper}