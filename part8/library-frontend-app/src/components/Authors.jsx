import AuthorBirth from "./AuthorBirth"

const Authors = (prop) => {
  if (!prop.show) {
    return null
  }
 
  const authors =  (prop.author)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirth  authors={authors}/>
    </div>
  )
}

export default Authors
