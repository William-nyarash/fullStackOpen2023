import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { notificationTimeOut } from "../reducers/noticicationReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  )

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>Votes: {anecdote.votes}</p>
          <button
            onClick={() => {
              dispatch(voteForAnecdote(anecdote.id))
              dispatch(notificationTimeOut(`You voted '${anecdote.content}'`)); // ✅ Fix here
            }}
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList;
