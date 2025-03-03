import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm =()=>{
  const dispatch = useDispatch()

  const createAnecdote = (event) =>{
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if(anecdote){
      dispatch(addAnecdote(anecdote))
      event.target.anecdote.value = ' '
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