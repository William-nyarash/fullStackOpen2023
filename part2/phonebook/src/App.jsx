import { useEffect, useState} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personServices from './services/persons'
import Notification from './components/Notification'
import Warning from './components/Warning'
import './index.css'


const App = () => {
  const [persons, setpersons] = useState([ ])
  const [newName,setNewName] = useState( '')
  const [newNumber,setNewNumber] = useState('') 
  const[showName,setShowName] = useState('')
  const[succes, setSucces] = useState(null)
  const[updatedNumber,setUpdatedNumber] = useState(null)
  const[errorMessage,setErrorMessage] = useState(null)

  const Hook =()=>{
  personServices
    .getAll()
    .then(response=>{
      setpersons(response.data)
      })
  }
  useEffect(Hook,[])
  const addNewperson =(event)=>{
      event.preventDefault()
      const personAlert = persons.find(person => person.name === newName)
        const newObject ={
                  name: newName,
                  number:newNumber
               } 
      if(personAlert){
                const  recurringUserName = persons.find(person => person.name == newName)
               
                 if(recurringUserName){
                       const confirmUpdate = window.confirm(`${newName} is added to phonebook , replace the old number instead ?`)
                       if(confirmUpdate == true){
                            personServices
                                      .Update(recurringUserName.id,newObject)
                                      .then(AlteredNumber => {
                                        setpersons(persons.map( person=> person.id !== recurringUserName.id ? person : AlteredNumber))
                                      })
                                      .then(()=>{
                                        setUpdatedNumber(`${newName} number has been updated succesfully`)
                                        setTimeout(()=>{
                                          setUpdatedNumber(null)
                                        }, 5000)
                                      })
                                      .catch(()=>{
                                        setErrorMessage(`${newName} could not be found in the sever`)
                                         setpersons(person =>person.filter(person => person.id !== recurringUserName.id))
                                        } )
                          }
                      }
            }
        else{
            
             personServices
                .create(newObject)
                .then(NewAddedPerson=>{
                setpersons(persons.concat(NewAddedPerson))
               
                setNewName( ' ' )
                 setNewNumber( ' ' )
               })
               .then(() =>{
                 setSucces(`${newName} was succesfuly added to phonebook`)  
                 setTimeout(()=> {
                  setSucces(null)
                 }, 6000)
               })
               .catch((error)=>{
                setErrorMessage(error.response.data.error)
                setTimeout(()=>{
                  setErrorMessage(null)
                },5000)
               })
             }

            }
const handleChange =setValue=>event => setValue(event.target.value)
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
  const handlepersonChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleDeleted=(id,name) =>()=>{
    if(window.confirm(`do you want to delete ${name}?`) ){
    personServices
          .trash(id).then(removed =>{
              setpersons(persons.filter(persons => persons.name !== removed.name))
             })          
            }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification    
                message={updatedNumber} 
                />
      <Warning
                errorMessage={errorMessage} 
                />
      <Notification 
             message={succes} 
             />
     <Filter    
           value={showName}     
           handleChange={handleChange(setShowName)} 
           />
      <h2>add a new</h2>
      <PersonForm 
             name={newName}   
             number={newNumber}   
             handleSubmit={addNewperson}  
             handleNumber={handleNumberChange}  
             handlePerson={handlepersonChange}  
              />
      <h2>Number</h2>
      <Persons    
          person={persons}    
          show={showName}
          handleDeleted={handleDeleted} 
          />
    </div>
  )
}
export default App
