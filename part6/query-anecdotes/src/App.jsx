import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Vote from './components/Vote'
import { getAnecdote, voteAnecdote } from './request'
import { NotificationProvider } from './components/NotificationContext'


const App = () => {
  const queryClient = useQueryClient()

  const { data: anecdotes, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdote,
    retry: 1, 
  })

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }
  return (
    <NotificationProvider>
      <h3>Anecdote App</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <Vote anecdote={anecdote}/>
        </div>
      ))}
    </NotificationProvider>
  )
}

export default App
