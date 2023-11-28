const PersonForm =({handleSubmit,handleNumber,handlePerson,name,number})=>{
  return(
      <div>
        <form onSubmit={handleSubmit}>
          <div>name:<input  id='name' value={name} onChange={handlePerson} /> </div>
          <div>number:<input  id='number' value={number} onChange={handleNumber} /> </div>
          <button type='submit'>add</button>
        </form>
      </div>
    )
  }
  export default PersonForm