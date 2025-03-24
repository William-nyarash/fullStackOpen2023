import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/FilterAnecdotes'
import Notification from'./components/Notification'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdotes from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect( ()=>{
    anecdotes.getAll().then( anecdote =>
      dispatch(setAnecdotes(anecdote))
    )
  }, [ ])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App