import { useState, useEffect } from 'react'
import useResource from './hook'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// const useResource = (baseUrl) => {
//   const [resources, setResources] = useState([])

//   // ...

//   const create = (resource) => {
//     // ...
//   }

//   const service = {
//     create
//   }

//   return [
//     resources, service
//   ]
// }

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const notes = useResource('http://localhost:3005/notes')
  const persons = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault() 
    notes.create({ content: content.value })
    
  }
  useEffect(()=>{
    //  notes.getAll()
     
  }, [notes])
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    persons.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {/* {notes.map(n => <p key={n.id}>{n.content}</p>)} */}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {/* {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)} */}
    </div>
  )
}

export default App