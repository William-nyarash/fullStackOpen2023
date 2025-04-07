import { useEffect, useState } from 'react'
import useResource from './hook'
const useField =(type)=>{
  const [value, setValue ] = useState("")

  const onChange = (event)=> {
    setValue(event.target.value)
  }

  return{
    type,
    onChange, 
    value
  }
}
const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const notes = useResource('http://localhost:3005/notes')
  const persons = useResource('http://localhost:3005/persons')

  useEffect(()=>{
    notes.getAll()
    persons.getAll()
  },[])
  // useEffect(() => {
  //       if (notes.resource && notes.resource.length > 0) {
  //     content.setValue(notes.resource[0].content)
  //   }

  //   if (persons.resource && persons.resource.length > 0) {
  //     name.setValue(persons.resource[0].name) 
  //     number.setValue(persons.resource[0].number) 
  //   }
  // }, [notes.resource, persons.resource]) 

  const handleNoteSubmit = (event) => {
    event.preventDefault() 
    notes.create({ content: content.value })
    
  }

 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    persons.create({ name: name.value, number: number.value})
  }
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit} >
        <input {...content} />
        <button>create</button>
      </form>
      {notes.resource && notes.resource.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.resource && persons.resource.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App