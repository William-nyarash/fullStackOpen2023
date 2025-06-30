import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteAnecdote } from "../request";

// eslint-disable-next-line react/prop-types
const Vote = ({anecdote}) => {
  
    const queryClient = useQueryClient()
    const anecdoteToVoteFor = anecdote
    const voteMutation= useMutation({
        mutationFn: voteAnecdote,
        onSuccess: (anecdoteWithVote) => {
            queryClient.setQueryData(['anecdotes'], (previousAnecdotes) => {
                return previousAnecdotes.map(anecdote => 
                    // eslint-disable-next-line react/prop-types
                    anecdote.id === anecdoteWithVote.id ? anecdoteWithVote : anecdote
                )
            })
          }
    })
    const handleVote = () => {
        const updatedVotes = anecdoteToVoteFor.votes + 1
        voteMutation.mutate({
            ...anecdoteToVoteFor, votes: updatedVotes
        })
    }
    return(
        <div>
            <div>{anecdoteToVoteFor.content}</div>
            <div>has {anecdoteToVoteFor.votes} {" "} {anecdoteToVoteFor.votes === 1 ? 'vote' : 'votes'}</div>
        <button onClick={handleVote}>vote</button>
        </div>
    )
}
export default Vote