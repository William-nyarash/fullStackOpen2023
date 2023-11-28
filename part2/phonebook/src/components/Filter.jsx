const Filter =({value,handleChange})=>{
    return(
      <div>
         <div>FIlter shown with<input id='filteredValue' value={value} onChange={handleChange}/></div>
      </div>
    )
  }
  export default Filter