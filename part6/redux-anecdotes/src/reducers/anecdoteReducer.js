import { createSlice } from '@reduxjs/toolkit'
import { notificationTimeOut } from './noticicationReducer'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      return state
        .map(anecdote =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes);
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote( state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
});

export const { vote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const voteForAnecdote = (id, content) => {
  return (dispatch) => {
    dispatch(vote(id));
    dispatch(notificationTimeOut(`You voted for "${content}"`)); 
  };
};

export default anecdoteSlice.reducer;
