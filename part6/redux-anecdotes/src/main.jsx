import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'

const store  = configureStore({
  reducer:{
    filter:filterReducer,
    anecdotes:anecdoteReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)