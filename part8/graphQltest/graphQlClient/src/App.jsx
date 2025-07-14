import {useQuery} from '@apollo/client'
import Persons from './Persons'
import { ALL_PERSONS } from './queries'

const App =()=> {
  
  const result = useQuery(ALL_PERSONS)
 
  if (result.loading) {
    return <div>loading .....</div>
  }
   const persons = result.data.allPersons
  return (
    <div>
      <h1>Welcome to Personfind.com</h1>
     <Persons persons={persons}  />
    </div>
  )
}

export default App;