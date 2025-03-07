import {useDispatch,useSelector} from 'react-redux'
import { handleVote} from '../reducers/anecdoteReducer'

const AnecdoteList  =() =>{
 const anecdotes = useSelector(({anecdotes, filter})=>{
  if(filter == 'ALL'){
    return anecdotes
  }
  return anecdotes.filter(anecdote =>
      anecdote?.content?.toLowerCase().includes(filter.toLowerCase())
    )
 })
 const dispatch = useDispatch()

 const vote =(id)=>{
  dispatch(handleVote(id))
 }
  return(
    <div>
      {
        anecdotes.map(anecdote =><div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}
            <button onClick={()=>{vote(anecdote.id)}}>vote</button>
          </div>
        </div>
        )
      }
    </div>
  )
}

export default AnecdoteList