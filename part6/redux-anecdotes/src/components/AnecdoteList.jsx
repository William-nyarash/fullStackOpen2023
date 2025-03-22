import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

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
  const anecdotes = useSelector(selectFilteredAnecdotes); 
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>Votes: {anecdote.votes}</p>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
