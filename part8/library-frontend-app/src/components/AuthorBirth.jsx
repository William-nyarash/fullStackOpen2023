import { useState } from "react"

const AuthorBirth =() => {
 const [name, setName ] = useState("");
 const [birth , setBirth] = useState("");

const handleSubmit =(event) =>{
    event.preventDefault();
    console.log("the data from user name is: ", name);
    console.log("the data from user birth  is: ",birth);
    setName(' ');
    setBirth(' ');
}

return (
    <div>
        <h2>Set birthyear</h2>
        <form  onSubmit={handleSubmit}>
            <div>
                name:
                <input 
                value={name}
                onChange={({target})=> setName(target.value)}
                />
            </div>
            <div>
                born: 
                <input 
                value={birth}
                onChange={({target}) => setBirth(target.value)}
                />
            </div>
            <button >update author</button>
        </form>
    </div>
)
}

export default AuthorBirth