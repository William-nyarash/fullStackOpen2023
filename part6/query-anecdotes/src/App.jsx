import { useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Vote from './components/Vote'
import { getAnecdote} from './request'
import { NotificationProvider } from './components/NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const bodyStyle = {
    width:"100%",
  }
 const warning = {
  margin:"0 auto",
  border: '2px solid rebeccapurple',
  color: 'red',
  padding:2 ,
  width:"80%",
  borderRadius:"12px",
  textAlign:"center"
 }
  const { data: anecdotes, isLoading, isError, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdote,
    refetchOnWindowFocus:false,
    retry: 1, 
  })

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }
  if(isError){
    return <p style={warning}>anecdote service not available due to {error.message}</p>
  }

  return (
    <NotificationProvider style={bodyStyle}>
      <h3>Anecdote App</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <Vote anecdote={anecdote}/>
        </div>
      ))}
    </NotificationProvider>
  )}

export default App
