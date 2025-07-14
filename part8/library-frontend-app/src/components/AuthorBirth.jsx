import { useState } from "react"
import { useMutation } from "@apollo/client";
import { ADD_AUTHOR_BIRTH, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const AuthorBirth =(authors) => {
 const [name, setName ] = useState("");
 const [birth , setBirth] = useState("");

const [editAuthor] = useMutation(ADD_AUTHOR_BIRTH, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
})
const handleSubmit =(event) =>{
    event.preventDefault();

    const parsedBorn = parseInt(birth, 10)
    editAuthor({variables: {name, born: parsedBorn}})
    setName('');
    setBirth('');
}


return (
    <div>
        <h2>Set birthyear</h2>
        <form  onSubmit={handleSubmit}>
            <div>
                name:
                <select onChange={({ target }) => setName(target.value)}>
                    {authors?.authors?.map(author => (
                    <option key={author.name} value={author.name}>
                        {author.name}
                    </option>
                    ))}
                </select>
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