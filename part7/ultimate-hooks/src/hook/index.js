import { useState } from "react";
import axios from "axios";

export default function useResource (baseUrl)  {


    const [resource , setResource] = useState([])

     let token =null

     const setToken = newToken=> {
         token =`bearer ${newToken}`
     }
     const getAll = async ()=> {
      try{ const response  = await axios.get(baseUrl)
       return setResource(Array.isArray(response.data) ? response.data : [])
    } catch(error){
        console.log('We have encountered error',error.message)
    }
    
     }

     const create = async (createNew) => {
        const config ={
            headers:{ Authorization: token}
        }

        try{
            const response = await axios.post(baseUrl,createNew,config)
            setResource((prevResource) => [...prevResource, response.data])
        } catch(error) {
            console.log("we have encountered",error.message)
        }
     }

     const update = async (id, modified) => {
        try {
            await axios.put(`${baseUrl}/${id}`, modified);
           setResource(prevResource => {
            const updatedResource = prevResource.map(item => 
              item.id === id ? { ...item, ...modified } : item
            );
            return updatedResource;
          });
        } catch (error) {
          console.log("We encountered an error while updating. The error is:", error.message);
        }
      };

     return {
        resource, 
        create, 
        getAll,
        update,
        setToken
     }
}

// export const useField =(type)=> {

//     const [value, setValue] = useState("")

//     const onChange =(event) => {
//         setValue(event.target.value)
//     }

//     return {
//         type,
//         value,
//         om
//     }
// }