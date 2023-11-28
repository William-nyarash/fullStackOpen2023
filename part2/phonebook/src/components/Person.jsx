const Person =({name,number,handleDeleted})=>{
    
    return(
        <>
          <div> 
                {name} {number}   <button onClick={handleDeleted}>delete</button>
            </div>
        </>
    )
}
export default Person