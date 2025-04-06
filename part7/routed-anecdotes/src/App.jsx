/* eslint-disable react/prop-types */
import { useState } from 'react'
import {Link,Route, Routes, useMatch} from 'react-router-dom'
import Footer from './components/Footer'
import useField from './hook'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
         <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link> 
        </li>)}
    </ul>
  </div>
)

const Anecdote =({anecdote})=>{

  return(
    <div>
      <h2>{anecdote.content}</h2>
      <p>{anecdote.author}</p>
      <p>for more information <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot; </em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)
const Notification = ({ notification }) => {

 const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: "black",
  }


 if (!notification) return null
 else
  return (
      <div style={style}>
        {notification ? `A new anecdote ${notification}" created!` : ''}
    </div>
  );
};

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info= useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    content.reset()
    author.reset()
    info.reset()
  }
  const handleReset = ()=> {
    content.reset()
    author.reset()
    info.reset()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


 

  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    if (!anecdote.content || !anecdote.author || !anecdote.info) {
      setNotification('All fields must be filled out');
      setTimeout(() => setNotification(null), 500); 
      return; 
    }
  
    anecdote.id = Math.round(Math.random() * 10000);
  
    setAnecdotes(anecdotes.concat(anecdote));
    
   setNotification(`A new anecdote created: ${anecdote.content}`);
    
   setTimeout(() => setNotification(null), 5000);
  };

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null
  
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
        <Route path='/create' element={<CreateNew addNew={addNew}/>}/>
        <Route path='/about' element={<About />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
