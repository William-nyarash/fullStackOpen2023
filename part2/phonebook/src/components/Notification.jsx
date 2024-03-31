const Notification =({message})=>{
 if(message == null){
    return null
 }
    return(
        <div className="addedPerson">
            {message}
        </div>
        )
}
export default Notification