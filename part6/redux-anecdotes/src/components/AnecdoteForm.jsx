import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/noticicationReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdotes = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
      event.target.anecdote.value = ""
      dispatch(createAnecdote(content))
      dispatch(setNotification(`New aecdote added : ${content}`))
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createAnecdotes}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
