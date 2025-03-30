import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdote } from './request'

const App = () => {
  const queryClient = useQueryClient()

  const { data: anecdotes, isLoading, isError, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdote,
    retry: 1, 
  })
  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
  }

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }
  return (
    <div>
      <h3>Anecdote App</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
