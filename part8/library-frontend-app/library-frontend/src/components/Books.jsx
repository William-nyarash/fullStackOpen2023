import { useQuery, gql } from "@apollo/client"

const ALL_BOOKS = gql `
  query {
    allBooks {
     title
     author
     published
    }
  }
`
const Books = (props) => {

  const  Books = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  if(Books.loading) {
    return <div>Loading ....</div>
  }
  const books = Books.data.allBooks

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
