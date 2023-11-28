const Input =({handleChange, value,text})=>{
return(
    <div>
       {text}  <input  value={value} onChange={handleChange}/>
    </div>
)
}
export default Input