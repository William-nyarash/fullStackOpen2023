import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {useQuery} from '@apollo/client';
import { ALL_AUTHORS } from "./queries";


const App = () => {
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_AUTHORS,{
    polInterval: 2000
});

  if(result.loading) {
    return <div>Loading ....</div>
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} author={result.data.allAuthors} />
     
     <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
