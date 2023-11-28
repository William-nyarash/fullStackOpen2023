const Notification =({message,errorMessage})=>{
 if(message == null){
    return null
 }
 else if (errorMessage == ''){
    return(
        <>
          <div className="errorMessage">{errorMessage}</div>
        </>
    )
 }
    return(
        <div className="addedPerson">
            {message}
        </div>
        )
}
export default Notification