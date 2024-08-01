import {useState} from 'react'
import MostVotedFor from './MostVotedFor'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'A computer program will never be a substitute for a human being, but it can be a very good substitute for another computer program.',
    'The best way to get good ideas is to get a lot of ideas.',
    'A language that doesn\'t have a way to lie is not even worth calling a language.',
    'The most important single thing in software is to handle text strings correctly, because that, of all the kinds of data, is going to cause the most problems.',
    'The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.',
    'The purpose of computer science is to find and exploit the parallels between the real and the abstract worlds, not to describe the real world in terms of the abstract world.',
    'A good programmer is someone who always looks both ways before crossing a one-way street.',
    'The first 10% of the code accounts for the first 90% of the development time, and the remaining 10% of the code accounts for the other 90% of the development time.',
    'The most important thing in software is to handle text strings correctly, because that, of all the kinds of data, is going to cause the most problems.',
    'The best code is written by people who are not programmers.',
    'There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.',
    'It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures.',
    'The art of programming is the art of telling interesting stories.',
    'The best way to get started is to quit'
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
// eslint-disable-next-line react/prop-types
const Heading =({heading})=>{
  return(
    <>
        <h1>{heading}</h1>    
    </>
  )
}
// eslint-disable-next-line react/prop-types, no-unused-vars
const Content =({anecdote,vote})=>{
  return(
    <> 
       <p>{anecdote}</p> 
    </>
  )
}
// eslint-disable-next-line react/prop-types
const Button =({handleClick,text})=>{
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}
// eslint-disable-next-line react/prop-types
// const MostVotedFor =({anecdote,vote})=>{
//   const highestVotes = Math.max(...vote)
//  const anecdoteWithMostVotes = vote.indexOf(highestVotes)
 
//  if (highestVotes === 0){
//   return(
//     <>
//       <p>no votes entered</p>
//     </>
//   )
//  }
//  else if(highestVotes === 1){
//   return(
//     <>
//       {anecdote[anecdoteWithMostVotes]}
//       <br/>
//       has{highestVotes} vote
//     </>
//   )
//  }
//  return(
//   <>
//   {anecdote[anecdoteWithMostVotes]}
//   <br />
//   has{highestVotes} votes
//   </>
//  )
// }



export default App
