import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdote = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, {
    content: newAnecdote.anecdote,
    votes: 0
  });
  return response.data;
};

export const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`,anecdote)
  return response.data
}