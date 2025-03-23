import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { voteForAnecdote } from "../reducers/anecdoteReducer";

const selectAnecdotes = state => state.anecdotes;
const selectFilter = state => state.filter;

const selectFilteredAnecdotes = createSelector(
  [selectAnecdotes, selectFilter],
  (anecdotes, filter) => {
    if (filter === "all") return anecdotes;
    return anecdotes.filter(anecdote => anecdote.content.includes(filter));
  }
);

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAnecdotes); 

  const handleVote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id, anecdote.content));
  };

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>Votes: {anecdote.votes}</p>
          <button onClick={() => handleVote(anecdote)}>vote</button> 
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
