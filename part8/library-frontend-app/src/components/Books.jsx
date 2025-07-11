import { useQuery, gql } from "@apollo/client"

const ALL_BOOKS = gql `
  query {
    unFilteredBooks {
     title
     author
     published
    }
  }
`
const Books = (prop) => {

  const  Books = useQuery(ALL_BOOKS)
  if (!prop.show) {
    return null
  }
  if(Books.loading) {
    return <div>Loading ....</div>
  }
 
  const books = Books.data.unFilteredBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
