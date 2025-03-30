import { useMutation,  useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    if (anecdote && anecdote.length >= 5) {
      newAnecdoteMutation.mutate({ content: anecdote, votes: 0 })
    } else {
      alert("Anecdote content must be at least 5 characters long")
    }
  }

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
