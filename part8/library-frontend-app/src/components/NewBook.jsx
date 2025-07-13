import { useState } from 'react'
import { useMutation } from  '@apollo/client';
import { CREATE_BOOK, ALL_AUTHORS } from '../queries';

const NewBook = (prop) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook, {error}] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  });

  if (!prop.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const publishedInt = parseInt(published , 10);
    createBook({ variables: {title,author,published: publishedInt,genres}})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

    return (
    <div>
      {/* display error message when invalid data is entered */}
      {error ? <p>{error.message}</p>: null}
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook