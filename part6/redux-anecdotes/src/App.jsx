import { useSelector, useDispatch } from 'react-redux'
import { handleVote, addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(handleVote(id))
    console.log("id is ",id)
  }
  const createAnecdote =(event) =>{
    event.preventDefault()
    const anecdote = event.target.anecdote.value.trim()
    if(anecdote){
      dispatch(addAnecdote(anecdote))
      event.target.anecdote.value = ' '
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App