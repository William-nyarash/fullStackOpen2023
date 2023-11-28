import {useState} from 'react'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const  [selected,setSelected] = useState(0)
  const[vote,setVoted] = useState(Array(anecdotes.length).fill(0))

  const setToVoted =()=>{
    const newVotes =[...vote]
    newVotes[selected] += 1
    setVoted(newVotes)
  }
  const setToSelected =()=>{
    const  random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  return (
    <>
      <Heading  heading="Anecdote of the day"/>
      <Content  anecdote={anecdotes[selected]} />
      <Button handleClick={setToVoted} text={"vote"} />
      <Button handleClick={setToSelected} text={"next anecdote"}/>
      <Heading heading={"Anecdote of the day"} />
      <MostVotedFor anecdote={anecdotes}  vote={vote} />
    </>
  )
}
const Heading =({heading})=>{
  return(
    <>
        <h1>{heading}</h1>    
    </>
  )
}
const Content =({anecdote,vote})=>{
  return(
    <> 
       <p>{anecdote}</p> 
    </>
  )
}
const Button =({handleClick,text})=>{
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}
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



export default App
