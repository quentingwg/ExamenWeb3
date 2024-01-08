import { useContext } from "react"
import { Context } from "../src/contexts/CountProvider"

const BadButton= () => {
    const {increaseBad, decreaseBad}= useContext(Context)

    return (
        <div> <button onClick={increaseBad}> Increase Bad</button>
        <button onClick={decreaseBad}> decrease Bad</button>
    </div>
   
    )
}


export default BadButton