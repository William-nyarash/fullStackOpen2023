import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdotes from "../services/anecdotes";

const AnecdoteForm =()=>{
  const dispatch = useDispatch()

  const createAnecdote = async (event) =>{
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if(anecdote){
      const content = event.target.note.value
      event.target.anecdote.value = ' '
      const newAnecdote = await anecdotes.createNew(content)
      dispatch(addAnecdote(newAnecdote))
    }
  }
  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input type="text" name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm