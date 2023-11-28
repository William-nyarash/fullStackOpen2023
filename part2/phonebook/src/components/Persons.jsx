import Person from './Person'

const Persons =({person,show,handleDeleted})=>{
     return(
      <div>
        {person.filter(person=> person.name.toLowerCase().includes(show)
        ).map(({id,name,number}) =>
         <Person  key={id} name={name} number={number} handleDeleted={handleDeleted(id,name)} />
        )}
      </div>
    )
  }
export default Persons