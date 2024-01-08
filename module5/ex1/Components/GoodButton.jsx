import { useContext } from "react"
import { Context } from "../src/contexts/CountProvider"


const handleClick = () => {

    increaseGood();
}
const GoodButton =()=> {
    const {increaseGood} = useContext(Context);

    return(     <button onClick = {increaseGood}> Increase Good</button>
    )
}




export default GoodButton