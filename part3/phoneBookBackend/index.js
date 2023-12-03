const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons',(require,response)=>{
    response.json(persons)
})
app.get('/info',(request,response)=>{
  const personLength = Number(persons.length)
    let day = new Date()
    response.send(`<p>Phonebook has info of ${personLength} people</p><br/><p>${day.toString()}</p>`)
})
app.get('/api/persons/:id',(request,response)=>{
     const id = Number(request.params.id)
      const person = persons.find(person=> person.id === id)
     if(person){

        response.json(person)
     } else{
        response.status(404).end()
     }
})
app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.filter(person=>person.id !== id)

    response.status(204).end()
})
const newPersonId =()=>{
   const randomId = Math.floor(Math.random() * 293)
    const highestId = persons.length > 0
    ? Math.max(...persons.map( p => p.id))
    :0
  return highestId + randomId
}
app.post('/api/persons',(request,response)=>{
    const body = request.body
   persons

    if(!body.name){
        return response.status(404).json({
            error: 'name missing'
        })
    } else if(!body.number){
        return response.status(404).json(
          {error: 'the number field is empty'}
          )}
   else if (persons.find((name)=>name.name === body.name)){
      return response.status(404).json(
        {error: `${body.name} already exists in phonebook`}
      )
    }
  
    const person ={
        name : body.name,
        number: body.number,
        id: newPersonId()
    }

    persons = persons.concat(person)

    response.json(person)
})
morgan.token('body',(request,response)=>JSON.stringify(request.body))
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})