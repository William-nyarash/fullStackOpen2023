import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async ()=> {
 const response = await axios.get(baseUrl)
 return response.data
}
const createNew = async ({ content }) => {
    const body =  content 
    const respone = await axios.post(baseUrl, body)
    return respone.data
} 
export default { getAll,createNew }

