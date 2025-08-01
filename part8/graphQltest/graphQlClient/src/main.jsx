import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
   ApolloClient,
   ApolloProvider,
   InMemoryCache} from '@apollo/client'
import { query } from './queries.js'
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })
ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>
)
