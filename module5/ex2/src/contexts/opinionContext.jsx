import { useState } from "react";
import React from "react";


const Context = React.createContext(null);
const ProviderWrapper =  (props)=> {
    const [opinions, setOpinions] = useState([{id: 1, content: "opinionA ", votes:10}]);

    const setVotesOpinion = (id) => {
        const lesOpinions= [...opinions]
        const opinion= lesOpinions.find(op=> op.id=== id)
        opinion.votes+=1
        
        setOpinions(lesOpinions);
    }

    const exposedValues= {opinions,
    setOpinions,setVotesOpinion}

    

    return( 
        <Context.Provider value={exposedValues}> 
            {props.children}
        </Context.Provider>
    )
}

export {Context,ProviderWrapper}