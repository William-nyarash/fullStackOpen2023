const MostVotedFor =({anecdote,vote})=>{
    const highestVotes = Math.max(...vote)
   const anecdoteWithMostVotes = vote.indexOf(highestVotes)
   
   if (highestVotes === 0){
    return(
      <>
        <p>no votes entered</p>
      </>
    )
   }
   else if(highestVotes === 1){
    return(
      <>
        {anecdote[anecdoteWithMostVotes]}
        <br/>
        has{highestVotes} vote
      </>
    )
   }
   return(
    <>
    {anecdote[anecdoteWithMostVotes]}
    <br />
    has{highestVotes} votes
    </>
   )
  }
  
export default MostVotedFor