import { useState } from "react";
import axios from "axios";

export default function useResource (baseUrl)  {


    const [resource , setResource] = useState([])

     let token =null

     const setToken = newToken=> {
         token =`bearer ${newToken}`
     }
     const getAll = async ()=> {
        const response  = await axios.get(baseUrl)
        setResource(response.data)
     }

     const create = async (createNew) => {
        const config ={
            headers:{ Authorization: token}
        }

        const response = await axios.post(baseUrl,createNew,config)
       console.log("the response is",response)
        setResource(response.data)
     }

     const update = async (id,modified) => {
        const response = await axios.put(`${baseUrl}/${id}`, modified)

        setResource(response.data)
     }

     return {
        resource, 
        create, 
        getAll,
        update,
        setToken
     }
}