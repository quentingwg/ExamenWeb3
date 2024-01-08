import { useParams } from "react-router-dom";

const Anecdote = ({anecdote}) => {
 return (
    <div> 
        <h2> {anecdote.content}</h2>
        <div> has {anecdote.votes} votes </div>
        <div> for more information, see <a href= {anecdote.info}> {anecdote.info}</a> </div>
    </div>
 )
}

export default Anecdote