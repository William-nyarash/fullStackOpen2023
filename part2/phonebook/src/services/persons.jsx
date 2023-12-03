import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response)
}

const create = newPersons => {
  const request = axios.post(baseUrl, newPersons)
  return request.then(response => response.data)
}

const trash = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
const Update=(id,numberUpdate)=>{
    const request = axios.put(`${baseUrl}/${id}`,numberUpdate)
    return request.then(response =>response.data)
}
const personServices ={ getAll ,Update,
     create, trash }
export default personServices